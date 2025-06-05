import type { FirebaseErrorInputs } from '../../../../shared/domain/interfaces';

import { AUTH_ERROR_MESSAGES } from '../../../domain/constants';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { Errors } from '../../../../shared/infrastructure/firebase';

const { USER_NOT_FOUND } = FIREBASE_ERROR_CODES;
const { INVALID_CREDENTIALS_MESSAGE } = AUTH_ERROR_MESSAGES;

export const throwError = (
  errorCode: FIREBASE_ERROR_CODES,
  path: string,
  errorInputs?: FirebaseErrorInputs
) => Errors.MakeThrowError({ path })(errorCode, errorInputs);

export const throwNotFoundError = (path: string) =>
  throwError(USER_NOT_FOUND, path, { message: INVALID_CREDENTIALS_MESSAGE });
