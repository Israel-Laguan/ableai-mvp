import * as bcrypt from 'bcrypt';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';

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
    WEAK_PASSWORD,
  },
  AUTH_ERROR_MESSAGES: {
    ALREADY_EXIST_MESSAGE,
    COULD_NOT_HASH_MESSAGE,
    PRIVATE_DATA_USER_CREATION_FAILED_MESSAGE,
    USER_CREATION_FAILED_MESSAGE,
    WEAK_PASSWORD_MESSAGE,
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

  [WEAK_PASSWORD]: () => Errors.BadRequestError.create(WEAK_PASSWORD_MESSAGE, 'AUTH_REGISTER'),
});

async function hashPassword(plainPassword: string) {
  const saltRounds = 10;

  return await bcrypt.hash(plainPassword, saltRounds).catch(() => {
    return throwError(COULD_NOT_HASH);
  });
}

zxcvbnOptions.setOptions({
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
});

export const makeRegisterUserUseCase = ({
  runInTransaction,
  runInRegister,
}: MakeRegisterUseCaseConfig): RegisterUseCase => {
  return async ({ email, password, fullName, phoneNumber = null }) => {
    const passwordStrength = zxcvbn(password).score;

    if (passwordStrength < 3) {
      throwError(WEAK_PASSWORD);
    }

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

      const [hashedPassword, privateDataUser] = await Promise.all([
        hashPassword(password),
        privateDataUserRepository.create({
          fullName,
          email,
          phoneNumber,
        }),
      ]);

      const { id } = privateDataUser[0];

      if (!id) {
        throwError(PRIVATE_DATA_USER_CREATION_FAILED);
      }

      const userRepository = repositoryManager.getRepository(USER_REPOSITORY);

      const user = await userRepository
        .create({
          password: hashedPassword,
          privateDataUserId: id,
        })
        .catch(() => {
          throwError(USER_CREATION_FAILED);
        });

      if (!user || !user[0]?.id) {
        throwError(USER_CREATION_FAILED);
      }

      await runInRegister({ email, password, fullName, phoneNumber });
    });
  };
};
