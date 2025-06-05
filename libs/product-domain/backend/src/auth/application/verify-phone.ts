import type { MakeVerifyPhoneNumberUseCaseConfig } from '../domain/interfaces';
import type { VerifyPhoneNumberUseCase } from '../domain/use-cases';

import { Errors, CONSTANTS } from '@shared';
import { AUTH_ERROR_MESSAGES } from '../domain/constants';

const { INVALID_CREDENTIALS_MESSAGE, ERROR_MESSAGE } = AUTH_ERROR_MESSAGES;
const { HTTP_STATUS_CODE } = CONSTANTS;
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;

const { throwError } = Errors.makeErrorRunner<
  undefined,
  (typeof HTTP_STATUS_CODE)['NOT_FOUND' | 'INTERNAL_SERVER_ERROR']
>({
  [NOT_FOUND]: () =>
    Errors.NotFoundResourceError.create(INVALID_CREDENTIALS_MESSAGE, 'PHONE_VERIFICATION'),

  [INTERNAL_SERVER_ERROR]: () =>
    Errors.InternalServerError.create(ERROR_MESSAGE, 'PHONE_VERIFICATION'),
});

export function MakeVerifyPhoneNumberUseCase<T, R>({
  privateDataUserRepository,
  runInPhoneVerification,
}: MakeVerifyPhoneNumberUseCaseConfig<T, R>): VerifyPhoneNumberUseCase<T, R> {
  return async input => {
    const result = await runInPhoneVerification(input);

    if (result.verified) {
      await privateDataUserRepository
        .getByEmail({ email: result.email })
        .catch(() => {
          throwError(INTERNAL_SERVER_ERROR);
        })
        .then(async user => {
          if (user) {
            await privateDataUserRepository.updateById(String(user.id), {
              phoneNumber: result.phoneNumber,
              phoneVerified: true,
            });
          } else {
            throwError(NOT_FOUND);
          }
        });

      return { ...result, email: '', phoneNumber: '', verified: true };
    }

    return { ...result, phoneNumber: '', email: '' };
  };
}
