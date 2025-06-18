import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';

import { PrivateDataUser, User } from '@models/auth';
import { Errors } from '@shared';
import { Constants } from '../domain';
import type { UpdateUserStatusKeys } from '../domain/constants';
import type { MakeUpdateUserCaseConfig } from '../domain/interfaces';
import type { UpdateUserUseCase } from '../domain/use-cases';
import { IOmitBase } from '@models/shared';

interface RegisterErrorInputs {
  email?: string;
  feedback?: string;
}

const {
  AUTH_DICTIONARY: { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY },
  REGISTER_STATUS_CODE: { WEAK_PASSWORD },
  AUTH_ERROR_MESSAGES: { WEAK_PASSWORD_MESSAGE, ERROR_MESSAGE, INVALID_CREDENTIALS_MESSAGE },
  UPDATE_STATUS_CODE: { INVALID_CREDENTIALS, ERROR_UPDATING_USER },
  top10k10plus,
} = Constants;

const { throwError } = Errors.makeErrorRunner<
  RegisterErrorInputs,
  UpdateUserStatusKeys | typeof WEAK_PASSWORD
>({
  [ERROR_UPDATING_USER]: () =>
    Errors.InternalServerError.create(ERROR_MESSAGE, 'UPDATE_USER_USE_CASE'),

  [INVALID_CREDENTIALS]: () =>
    Errors.UnauthorizeError.create(INVALID_CREDENTIALS_MESSAGE, 'AUTH_REGISTER'),

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

export const makeUpdateUserUseCase = <
  CustomInput extends object = object,
  CustomOutput extends object = object
>({
  runInTransaction,
  runInUpdate,
}: MakeUpdateUserCaseConfig<CustomInput, CustomOutput>): UpdateUserUseCase<
  CustomInput,
  CustomOutput
> => {
  return async input => {
    const { password } = input;

    if (password) {
      const { score: passwordStrength, feedback } = zxcvbn(password);

      const PASSWORD_STRENGTH_SCORE = 3;

      if (passwordStrength < PASSWORD_STRENGTH_SCORE) {
        throwError(WEAK_PASSWORD, { feedback: feedback.warning || 'No feedback provided' });
      }
    }

    const { rollback, ...result } = await runInUpdate(input);

    await runInTransaction(async repositoryManager => {
      try {
        const userRepository = repositoryManager.getRepository(USER_REPOSITORY);

        const { id, avatarUrl, displayName, lastAppRole, lastViewBuyer, lastViewWorker } =
          input.user;

        const { privateDataUserId } = (await userRepository
          .getById(String(id))
          .catch(() => throwError(ERROR_UPDATING_USER))) as User;

        if (!id || !privateDataUserId) {
          throwError(INVALID_CREDENTIALS);
        }

        if (avatarUrl || displayName || lastAppRole || lastViewBuyer || lastViewWorker) {
          const userUpdates: Partial<Omit<User, IOmitBase>> = {};

          if (avatarUrl) {
            userUpdates.avatarUrl = avatarUrl;
          }
          if (displayName) {
            userUpdates.displayName = displayName;
          }
          if (lastAppRole) {
            userUpdates.lastAppRole = lastAppRole;
          }
          if (lastViewBuyer) {
            userUpdates.lastViewBuyer = lastViewBuyer;
          }
          if (lastViewWorker) {
            userUpdates.lastViewWorker = lastViewWorker;
          }

          await userRepository.updateById(String(id), userUpdates).catch(error => {
            console.log(error.message);
            throwError(ERROR_UPDATING_USER);
          });
        }

        if (input.privateDataUser) {
          const { email, fullName, phoneNumber } = input.privateDataUser;
          const privateDataUserUpdates: Partial<Omit<PrivateDataUser, IOmitBase>> = {};

          if (email) {
            privateDataUserUpdates.email = email;
          }
          if (fullName) {
            privateDataUserUpdates.fullName = fullName;
          }
          if (phoneNumber) {
            privateDataUserUpdates.phoneNumber = phoneNumber;
          }

          const privateDataUserRepository = repositoryManager.getRepository(
            PRIVATE_USER_DATA_REPOSITORY
          );

          await privateDataUserRepository
            .updateById(String(privateDataUserId), privateDataUserUpdates)
            .catch(() => throwError(ERROR_UPDATING_USER));
        }
      } catch (error) {
        await rollback();
        throw error;
      }
    });

    return result as CustomOutput;
  };
};
