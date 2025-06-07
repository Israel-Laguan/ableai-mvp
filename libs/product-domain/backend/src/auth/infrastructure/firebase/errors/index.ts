import type { FirebaseErrorInputs } from '../../../../shared/domain/interfaces';

import { AUTH_ERROR_MESSAGES } from '../../../domain/constants';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { Errors } from '../../../../shared/infrastructure/firebase';

const { INVALID_CREDENTIALS } = FIREBASE_ERROR_CODES;
const { INVALID_CREDENTIALS_MESSAGE } = AUTH_ERROR_MESSAGES;

export const throwError = (
  errorCode: FIREBASE_ERROR_CODES,
  path: string,
  errorInputs?: FirebaseErrorInputs
) => Errors.MakeThrowError({ path })(errorCode, errorInputs);

export const throwInvalidCredentialsError = (path: string) =>
  throwError(INVALID_CREDENTIALS, path, { message: INVALID_CREDENTIALS_MESSAGE });
