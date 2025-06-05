import * as bcrypt from 'bcrypt';

import type { RegisterStatusKeys } from '../domain/constants';
import type { MakeRegisterUseCaseConfig } from '../domain/interfaces';
import type { RegisterUseCase } from '../domain/use-cases';

import { Errors } from '@shared';
import { Constants } from '../domain';

interface RegisterErrorInputs {
  email?: string;
}

const {
  AUTH_DICTIONARY: { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY },
  REGISTER_STATUS_CODE: {
    ALREADY_EXIST,
    COULD_NOT_HASH,
    PRIVATE_DATA_USER_CREATION_FAILED,
    USER_CREATION_FAILED,
  },
  AUTH_ERROR_MESSAGES: {
    ALREADY_EXIST_MESSAGE,
    COULD_NOT_HASH_MESSAGE,
    PRIVATE_DATA_USER_CREATION_FAILED_MESSAGE,
    USER_CREATION_FAILED_MESSAGE,
  },
} = Constants;

const { throwError } = Errors.makeErrorRunner<RegisterErrorInputs, RegisterStatusKeys>({
  [ALREADY_EXIST]: () => Errors.AlreadyExistError.create(ALREADY_EXIST_MESSAGE, 'AUTH_REGISTER'),

  [COULD_NOT_HASH]: () =>
    Errors.InternalServerError.create(COULD_NOT_HASH_MESSAGE, 'AUTH_REGISTER'),

  [PRIVATE_DATA_USER_CREATION_FAILED]: () =>
    Errors.InternalServerError.create(PRIVATE_DATA_USER_CREATION_FAILED_MESSAGE, 'AUTH_REGISTER'),

  [USER_CREATION_FAILED]: () =>
    Errors.InternalServerError.create(USER_CREATION_FAILED_MESSAGE, 'AUTH_REGISTER'),
});

async function hashPassword(plainPassword: string) {
  const saltRounds = 10;

  return await bcrypt.hash(plainPassword, saltRounds).catch(() => {
    return throwError(COULD_NOT_HASH);
  });
}

export const makeRegisterUserUseCase = ({
  runInTransaction,
  sendEmailLink,
}: MakeRegisterUseCaseConfig): RegisterUseCase => {
  return async ({ email, password, fullName, phoneNumber = null }) => {
    await runInTransaction(async repositoryManager => {
      const privateDataUserRepository = repositoryManager.getRepository(
        PRIVATE_USER_DATA_REPOSITORY
      );

      const userExist = await privateDataUserRepository
        .getByEmail({ email })
        .catch(() => throwError(USER_CREATION_FAILED));

      if (userExist) {
        throwError(ALREADY_EXIST);
      }

      await Promise.all([
        hashPassword(password),
        privateDataUserRepository.create({
          fullName,
          email,
          phoneNumber,
        }),
      ])
        .catch(async error => {
          throw error;
        })
        .then(async ([hashedPassword, [privateDataUser]]) => {
          const { id } = privateDataUser;

          if (!id) {
            throwError(PRIVATE_DATA_USER_CREATION_FAILED);
          }

          const userRepository = repositoryManager.getRepository(USER_REPOSITORY);

          const user = await userRepository.create({
            password: hashedPassword,
            privateDataUserId: id,
          });

          if (!user) {
            throwError(USER_CREATION_FAILED);
          }
        });
    });

    await sendEmailLink({ email });
  };
};
