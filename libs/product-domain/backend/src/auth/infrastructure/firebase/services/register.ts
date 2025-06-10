import type { Infra } from '@models/auth';
import type { FirebaseError, FirebaseUserRecord } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError, throwInvalidCredentialsError } from '../errors';

const { INVALID_CREDENTIALS, UNKNOWN_ERROR } = FIREBASE_ERROR_CODES;
const ERROR_PATH = 'AUTH_REGISTER_SERVICE';

export function makeFirebaseRegisterService({ auth }: { auth: FirebaseAuthModule }) {
  return async ({ email, fullName, password, phoneNumber }: Infra.RegisterInput) => {
    const user: FirebaseUserRecord | null = await auth
      .getUserByEmail(email)
      .catch(async (error: unknown) => {
        if ((error as FirebaseError)?.code === INVALID_CREDENTIALS) {
          return null;
        } else {
          return throwError(UNKNOWN_ERROR, ERROR_PATH);
        }
      });

    if (user) {
      throwInvalidCredentialsError(ERROR_PATH);
    }

    return await auth.createUser({
      displayName: fullName,
      email,
      password,
      phoneNumber,
    });
  };
}
