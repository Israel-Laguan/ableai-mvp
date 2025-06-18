import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';

import type { RegisterStatusKeys } from '../domain/constants';
import type { MakeRegisterUseCaseConfig } from '../domain/interfaces';
import type { RegisterUseCase } from '../domain/use-cases';

import { Errors } from '@shared';
import { Constants } from '../domain';
import { User } from '@models/auth';

interface RegisterErrorInputs {
  email?: string;
}

const {
  AUTH_DICTIONARY: { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY },
  REGISTER_STATUS_CODE: {
    ALREADY_EXIST,
    PRIVATE_DATA_USER_CREATION_FAILED,
    USER_CREATION_FAILED,
    WEAK_PASSWORD,
  },
  AUTH_ERROR_MESSAGES: {
    ALREADY_EXIST_MESSAGE,
    PRIVATE_DATA_USER_CREATION_FAILED_MESSAGE,
    USER_CREATION_FAILED_MESSAGE,
    WEAK_PASSWORD_MESSAGE,
  },
  top10k10plus,
} = Constants;

const { throwError } = Errors.makeErrorRunner<
  RegisterErrorInputs & { feedback?: string },
  RegisterStatusKeys
>({
  [ALREADY_EXIST]: () => Errors.AlreadyExistError.create(ALREADY_EXIST_MESSAGE, 'AUTH_REGISTER'),

  [PRIVATE_DATA_USER_CREATION_FAILED]: () =>
    Errors.InternalServerError.create(PRIVATE_DATA_USER_CREATION_FAILED_MESSAGE, 'AUTH_REGISTER'),

  [USER_CREATION_FAILED]: () =>
    Errors.InternalServerError.create(USER_CREATION_FAILED_MESSAGE, 'AUTH_REGISTER'),

  [WEAK_PASSWORD]: ({ feedback }) =>
    Errors.BadRequestError.create(
      `${WEAK_PASSWORD_MESSAGE}
    ${feedback || 'No feedback provided'}.`,
      'AUTH_REGISTER'
    ),
});

zxcvbnOptions.setOptions({
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    'top-10k-10plus': top10k10plus,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
});

export const makeRegisterUserUseCase = <CustomOutput extends object = object>({
  runInTransaction,
  runInRegister,
}: MakeRegisterUseCaseConfig<CustomOutput>): RegisterUseCase<CustomOutput> => {
  return async ({ email, password, fullName, phoneNumber = null }) => {
    const { score: passwordStrength, feedback } = zxcvbn(password);

    const PASSWORD_STRENGTH_SCORE = 3;

    if (passwordStrength < PASSWORD_STRENGTH_SCORE) {
      throwError(WEAK_PASSWORD, { feedback: feedback.warning || 'No feedback provided' });
    }

    return await runInTransaction(async repositoryManager => {
      const privateDataUserRepository = repositoryManager.getRepository(
        PRIVATE_USER_DATA_REPOSITORY
      );

      const userExist = await privateDataUserRepository
        .getByEmail({ email })
        .catch(() => throwError(USER_CREATION_FAILED));

      if (userExist) {
        throwError(ALREADY_EXIST);
      }

      const [privateDataUser] = await privateDataUserRepository.create({
        fullName,
        email,
        phoneNumber,
      });

      const { id } = privateDataUser;

      if (!id) {
        throwError(PRIVATE_DATA_USER_CREATION_FAILED);
      }

      const userRepository = repositoryManager.getRepository(USER_REPOSITORY);

      const user = (await userRepository
        .create({
          privateDataUserId: id,
        })
        .then(user => user[0])
        .catch(() => {
          throwError(USER_CREATION_FAILED);
        })) as User;

      if (!user || !user?.id) {
        throwError(USER_CREATION_FAILED);
      }

      const result = await runInRegister({
        password,
        user,
        privateDataUser,
      });

      return result as CustomOutput;
    });
  };
};
