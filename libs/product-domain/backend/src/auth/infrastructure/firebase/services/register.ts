import type { FirebaseError, FirebaseUserRecord } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { VerifyEmail } from '../../../domain/services';
import { throwError } from '../errors';

const { USER_NOT_FOUND, UNKNOWN_ERROR } = FIREBASE_ERROR_CODES;
const ERROR_PATH = 'AUTH_REGISTER_SERVICE';

export function makeFirebaseRegisterService({ auth }: { auth: FirebaseAuthModule }): VerifyEmail {
  return async ({ email }) => {
    const user: FirebaseUserRecord | null = await auth
      .getUserByEmail(email)
      .catch(async (error: unknown) => {
        if ((error as FirebaseError)?.code === USER_NOT_FOUND) {
          return null;
        } else {
          return throwError(UNKNOWN_ERROR, ERROR_PATH);
        }
      });

    if (!user) {
      await auth.createUser({
        email,
        emailVerified: false,
      });
    }
  };
}
