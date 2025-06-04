import type { Infra, PrivateDataUser, User } from '@models/auth';
import type { PrivateDataUserRepository, UserRepository } from '../domain/repositories';

import { Errors, CONSTANTS } from '@shared';
import { USER_STATUS } from '@models/auth';
import { AUTH_ERROR_MESSAGES } from '../domain/constants';

const { INVALID_CREDENTIALS_MESSAGE } = AUTH_ERROR_MESSAGES;
const { HTTP_STATUS_CODE } = CONSTANTS;
const { NOT_FOUND } = HTTP_STATUS_CODE;

const { throwError } = Errors.makeErrorRunner<undefined, (typeof HTTP_STATUS_CODE)['NOT_FOUND']>({
  [NOT_FOUND]: () =>
    Errors.NotFoundResourceError.create(INVALID_CREDENTIALS_MESSAGE, 'EMAIL_VERIFICATION_REGISTER'),
});

export function MakeVerifyEmailUseCase(config: {
  userRepository: UserRepository;
  privateDataUserRepository: PrivateDataUserRepository;
}) {
  return async ({ email }: Pick<Infra.RegisterInput, 'email'>): Promise<User[]> => {
    const { userRepository, privateDataUserRepository } = config;

    const user = await privateDataUserRepository.getByEmail({ email });

    if (!user) {
      throwError(NOT_FOUND);
    }

    const result = await userRepository.updateByPrivateDataUserId((user as PrivateDataUser).id, {
      enabled: USER_STATUS.ENABLE,
    });

    return result;
  };
}
