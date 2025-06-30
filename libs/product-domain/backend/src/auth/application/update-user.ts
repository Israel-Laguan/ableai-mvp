import type { User } from '@models/auth';
import type { UpdateUserStatusKeys } from '../domain/constants';
import type { MakeUpdateMeUserCaseConfig } from '../domain/interfaces';
import type { UpdateMeUserUseCase } from '../domain/use-cases';

import { Errors, Utils } from '@shared';
import { Constants } from '../domain';

interface RegisterErrorInputs {
  email?: string;
  feedback?: string;
}

const {
  AUTH_DICTIONARY: {
    BUYER_REPOSITORY,
    PRIVATE_USER_DATA_REPOSITORY,
    USER_REPOSITORY,
    WORKER_REPOSITORY,
  },
  AUTH_ERROR_MESSAGES: { ERROR_MESSAGE, INVALID_CREDENTIALS_MESSAGE },
  UPDATE_STATUS_CODE: { INVALID_CREDENTIALS, ERROR_UPDATING_USER },
} = Constants;

const { throwError } = Errors.makeErrorRunner<RegisterErrorInputs, UpdateUserStatusKeys>({
  [ERROR_UPDATING_USER]: () =>
    Errors.InternalServerError.create(ERROR_MESSAGE, 'UPDATE_USER_USE_CASE'),

  [INVALID_CREDENTIALS]: () =>
    Errors.UnauthorizeError.create(INVALID_CREDENTIALS_MESSAGE, 'AUTH_REGISTER'),
});

const { removeFalsyEntries } = Utils;

export const makeUpdateUserUseCase = <
  CustomInput extends object = object,
  CustomOutput extends object = object
>({
  runInTransaction,
  runInUpdate,
}: MakeUpdateMeUserCaseConfig<CustomInput, CustomOutput>): UpdateMeUserUseCase<
  CustomInput,
  CustomOutput
> => {
  return async input => {
    const { rollback, ...result } = await runInUpdate(input);

    await runInTransaction(async repositoryManager => {
      try {
        const userRepository = repositoryManager.getRepository(USER_REPOSITORY);

        const { user } = input;

        const { id } = user;

        const { privateDataUserId } = (await userRepository
          .getById(String(id))
          .catch(() => throwError(ERROR_UPDATING_USER))) as User;

        if (!id || !privateDataUserId) {
          throwError(INVALID_CREDENTIALS);
        }

        const userUpdates = removeFalsyEntries(input.user);

        if (userUpdates && Object.keys(userUpdates).length) {
          await userRepository.updateById(String(id), userUpdates).catch(() => {
            throwError(ERROR_UPDATING_USER);
          });
        }

        const privateDataUserUpdates = removeFalsyEntries(input.privateDataUser);

        if (privateDataUserUpdates && Object.keys(privateDataUserUpdates).length) {
          const privateDataUserRepository = repositoryManager.getRepository(
            PRIVATE_USER_DATA_REPOSITORY
          );

          await privateDataUserRepository
            .updateById(String(privateDataUserId), privateDataUserUpdates)
            .catch(() => throwError(ERROR_UPDATING_USER));
        }

        const buyerUpdates = removeFalsyEntries(input.buyer);

        if (buyerUpdates && Object.keys(buyerUpdates).length) {
          const buyerRepository = repositoryManager.getRepository(BUYER_REPOSITORY);

          await buyerRepository.updateByUserId(id, buyerUpdates);
        }

        const workerUpdates = removeFalsyEntries(input.worker);

        if (workerUpdates && Object.keys(workerUpdates).length) {
          const buyerRepository = repositoryManager.getRepository(WORKER_REPOSITORY);

          await buyerRepository.updateByUserId(id, workerUpdates);
        }

        return void 0;
      } catch (error) {
        await rollback();
        throw error;
      }
    });

    return result as CustomOutput;
  };
};
