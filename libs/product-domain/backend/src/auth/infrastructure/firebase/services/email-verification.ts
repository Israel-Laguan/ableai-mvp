import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { Errors } from '../../../../shared/infrastructure/firebase';
import { VerifyEmail } from '../../../domain/services';

const { USER_NOT_FOUND, UNKNOWN_ERROR } = FIREBASE_ERROR_CODES;

const { throwError } = Errors;

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
          throwError(USER_NOT_FOUND);
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
