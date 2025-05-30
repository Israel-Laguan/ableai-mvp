import * as bcrypt from 'bcrypt';

import { Errors } from '@shared';
import { Infra as AuthInfra } from '@models/auth';
import { Infra } from '../../shared';
import { DependencyInjection, Repositories } from '../domain';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';

const saltRounds = 10;

async function hashPassword(plainPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch {
    throw Errors.InternalServerError.create('Could not hash the password.', 'AUTH_REGISTER');
  }
}

export const makeRegisterUserUseCase = (config: {
  privateDataUserRepository: {
    db: NodePgDatabase;
    repositoryMaker: Repositories.PrivateDataUserRepositoryMaker<NodePgDatabase>;
  };
  userRepository: {
    db: NodePgDatabase;
    repositoryMaker: Repositories.UserRepositoryMaker<NodePgDatabase>;
  };
  emailLinkService: DependencyInjection.ThirdPartyEmailLinkServices;
}) => {
  const { privateDataUserRepository, userRepository, emailLinkService } = config;

  const runInTransaction = Infra.Drizzle.Repositories.makeDrizzleUnitOfWork([
    {
      db: privateDataUserRepository.db,
      repositoryName: 'privateDataUserRepository',
      repositoryMaker: privateDataUserRepository.repositoryMaker,
    },
    {
      db: userRepository.db,
      repositoryName: 'userRepository',
      repositoryMaker: userRepository.repositoryMaker,
    },
  ]);

  return async ({ email, password, fullName, phoneNumber = null }: AuthInfra.RegisterInput) => {
    const { success } = await runInTransaction(async repositoryManager => {
      const privateDataUserRepository =
        repositoryManager.getRepository<Repositories.PrivateDataUserRepository>(
          'privateDataUserRepository'
        );
      const userRepository =
        repositoryManager.getRepository<Repositories.UserRepository>('userRepository');

      const userExist = await privateDataUserRepository.getByEmail({ email });

      if (userExist) {
        throw Errors.AlreadyExistError.create(`The user ${email} already exist`, 'AUTH_REGISTER');
      }

      const { sendVerificationEmailLink, rollbackThirdPartyEmailRegistration } =
        await emailLinkService({ email });

      try {
        const hashedPassword = await hashPassword(password);

        const privateDataUser = await privateDataUserRepository.create({
          fullName,
          email,
          phoneNumber,
        });

        if (!privateDataUser || privateDataUser.length === 0) {
          throw Errors.InternalServerError.create(`Could not create the user.`, 'AUTH_REGISTER');
        }

        const user = await userRepository.create({
          password: hashedPassword,
          privateDataUserId: privateDataUser[0].id,
        });

        if (!user) {
          throw Errors.InternalServerError.create(
            'Could not create the user in the repository.',
            'AUTH_REGISTER'
          );
        }

        await sendVerificationEmailLink();
      } catch (error) {
        await rollbackThirdPartyEmailRegistration();
        throw Errors.InternalServerError.create(
          'An error occurred during user registration.',
          'AUTH_REGISTER',
          error
        );
      }
      return { success: true };
    });

    return { success };
  };
};
