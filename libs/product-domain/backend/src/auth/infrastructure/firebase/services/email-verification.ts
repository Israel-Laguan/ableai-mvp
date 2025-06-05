import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { VerifyEmail } from '../../../domain/services';
import { throwError, throwNotFoundError } from './errors';

const { USER_NOT_FOUND, UNKNOWN_ERROR } = FIREBASE_ERROR_CODES;

export function makeFirebaseEmailVerificationService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): VerifyEmail {
  return async ({ email }) => {
    await auth
      .getUserByEmail(email)
      .catch(async (error: unknown) => {
        if ((error as FirebaseError)?.code === USER_NOT_FOUND) {
          throwNotFoundError();
        } else {
          throwError(UNKNOWN_ERROR);
        }
      })
      .then(async user => {
        if (user) {
          await auth.updateUser(user.uid, { emailVerified: true }).catch(() => {
            throwError(UNKNOWN_ERROR);
          });
        }
      });
  };
}
