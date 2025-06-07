import type { UserRecord } from 'firebase-admin/lib/auth/user-record';

import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { VerifyEmail } from '../../../domain/services';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError, throwInvalidCredentialsError } from '../errors';

const { INVALID_CREDENTIALS, UNKNOWN_ERROR } = FIREBASE_ERROR_CODES;
const ERROR_PATH = 'AUTH_EMAIL_VERIFICATION_SERVICE';

export function makeFirebaseEmailVerificationService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): VerifyEmail<null | UserRecord | void> {
  return async ({ email }) => {
    return await auth
      .getUserByEmail(email)
      .catch(async (error: unknown) => {
        if ((error as FirebaseError)?.code === INVALID_CREDENTIALS) {
          throwInvalidCredentialsError(ERROR_PATH);
        } else {
          throwError(UNKNOWN_ERROR, ERROR_PATH);
        }
      })
      .then(async user => {
        if (user) {
          return await auth.updateUser(user.uid, { emailVerified: true }).catch(() => {
            throwError(UNKNOWN_ERROR, ERROR_PATH);
          });
        } else {
          return null;
        }
      });
  };
}
