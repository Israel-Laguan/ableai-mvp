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
  registerProviders: { runBeforeRegister, runAfterRegister },
}: MakeRegisterUseCaseConfig<CustomOutput>): RegisterUseCase<CustomOutput> => {
  return async input => {
    const { score: passwordStrength, feedback } = zxcvbn(input.password);

    const PASSWORD_STRENGTH_SCORE = 3;

    if (passwordStrength < PASSWORD_STRENGTH_SCORE) {
      throwError(WEAK_PASSWORD, { feedback: feedback.warning || 'No feedback provided' });
    }

    const runBeforeRegisterOutput = await runBeforeRegister(input);

    const { rollback, ...runBeforeRegisterOutputWithoutRollback } = runBeforeRegisterOutput;

    return await runInTransaction(async repositoryManager => {
      const {
        user: { uid },
      } = runBeforeRegisterOutputWithoutRollback;

      try {
        if (!uid) {
          throw throwError(USER_CREATION_FAILED);
        }

        const userRepository = repositoryManager.getRepository(USER_REPOSITORY);

        const [userExist] = await userRepository.getByUid(uid).catch(() => {
          throw throwError(USER_CREATION_FAILED);
        });

        if (userExist?.id) {
          throw throwError(ALREADY_EXIST);
        }

        const privateDataUserRepository = repositoryManager.getRepository(
          PRIVATE_USER_DATA_REPOSITORY
        );

        const [privateDataUser] = await privateDataUserRepository.create(input);

        const newUser = (await userRepository
          .create({
            uid,
            privateDataUserId: privateDataUser.id,
          })
          .then(user => user[0])
          .catch(() => {
            throw throwError(USER_CREATION_FAILED);
          })) as User;

        if (!newUser?.id) {
          throw throwError(USER_CREATION_FAILED);
        }

        return await runAfterRegister({
          ...runBeforeRegisterOutputWithoutRollback,
          user: newUser,
          privateDataUser,
        });
      } catch (error) {
        rollback();
        throw error;
      }
    });
  };
};
