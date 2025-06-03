import * as bcrypt from 'bcrypt';

import { Errors } from '@shared';
import type { Infra as AuthInfra, DependencyInjection } from '@models/auth';
import { SharedDictionary } from '@models/shared';
import type { Repositories } from '../domain';

interface RegisterErrorInputs {
  email?: string;
}

const { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY } = SharedDictionary;

const { throwError } = Errors.makeErrorRunner<RegisterErrorInputs>({
  'already-exist': ({ email }) =>
    Errors.AlreadyExistError.create(`The user ${email} already exist`, 'AUTH_REGISTER'),

  'could-not-hash': () =>
    Errors.InternalServerError.create('Could not hash the password.', 'AUTH_REGISTER'),

  'private-data-user-creation-failed': () =>
    Errors.InternalServerError.create(`Could not create the user private data.`, 'AUTH_REGISTER'),

  'user-creation-failed': () =>
    Errors.InternalServerError.create(
      `Could not create the user in the repository.`,
      'AUTH_REGISTER'
    ),
});

async function hashPassword(plainPassword: string) {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch {
    return throwError('could-not-hash');
  }
}

export const makeRegisterUserUseCase = (config: {
  runInTransaction: Repositories.RegisterTransaction;
  emailLinkService: DependencyInjection.ThirdPartyEmailLinkServices;
}) => {
  const { runInTransaction, emailLinkService } = config;

  return async ({ email, password, fullName, phoneNumber = null }: AuthInfra.RegisterInput) => {
    const { success } = await runInTransaction(async repositoryManager => {
      const privateDataUserRepository = repositoryManager.getRepository(
        PRIVATE_USER_DATA_REPOSITORY
      );

      const userRepository = repositoryManager.getRepository(USER_REPOSITORY);

      const userExist = await privateDataUserRepository.getByEmail({ email });

      if (userExist) throwError('already-exist', { email });

      const { sendVerificationEmailLink, rollbackThirdPartyEmailRegistration } =
        await emailLinkService({ email });

      await Promise.all([
        hashPassword(password),
        privateDataUserRepository.create({
          fullName,
          email,
          phoneNumber,
        }),
      ])
        .catch(async error => {
          await rollbackThirdPartyEmailRegistration();
          throw error;
        })
        .then(async ([hashedPassword, [privateDataUser]]) => {
          const { id } = privateDataUser;

          if (!id) throwError('private-data-user-creation-failed');

          const user = await userRepository.create({
            password: hashedPassword,
            privateDataUserId: id,
          });

          if (!user) throwError('user-creation-failed');

          await sendVerificationEmailLink();
        });

      return { success: true };
    });

    return { success };
  };
};
