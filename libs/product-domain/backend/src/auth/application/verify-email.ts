import type { Infra, PrivateDataUser } from '@models/auth';
import type { MakeVerifyEmailUseCaseConfig } from '../domain/interfaces';
import type { VerifyEmailUseCase } from '../domain/use-cases';

import { Errors, CONSTANTS } from '@shared';
import { USER_STATUS } from '@models/auth';
import { AUTH_ERROR_MESSAGES } from '../domain/constants';

const { INVALID_CREDENTIALS_MESSAGE, ERROR_MESSAGE } = AUTH_ERROR_MESSAGES;
const { HTTP_STATUS_CODE } = CONSTANTS;
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;

const { throwError } = Errors.makeErrorRunner<
  undefined,
  (typeof HTTP_STATUS_CODE)['NOT_FOUND' | 'INTERNAL_SERVER_ERROR']
>({
  [NOT_FOUND]: () =>
    Errors.NotFoundResourceError.create(INVALID_CREDENTIALS_MESSAGE, 'EMAIL_VERIFICATION_REGISTER'),

  [INTERNAL_SERVER_ERROR]: () =>
    Errors.InternalServerError.create(ERROR_MESSAGE, 'EMAIL_VERIFICATION_REGISTER'),
});

export function MakeVerifyEmailUseCase({
  userRepository,
  privateDataUserRepository,
}: MakeVerifyEmailUseCaseConfig): VerifyEmailUseCase {
  return async ({ email }: Pick<Infra.RegisterInput, 'email'>): Promise<void> => {
    const user = await privateDataUserRepository.getByEmail({ email });

    if (!user) {
      throwError(NOT_FOUND);
    }

    await userRepository
      .updateByPrivateDataUserId((user as PrivateDataUser).id, {
        enabled: USER_STATUS.ENABLE,
      })
      .catch(() => {
        throwError(INTERNAL_SERVER_ERROR);
      });
  };
}
