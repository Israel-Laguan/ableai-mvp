import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

import { AUTH_ERROR_MESSAGES } from '../../../domain/constants';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { Errors } from '../../../../shared/infrastructure/firebase';

const { ERROR_MESSAGE } = AUTH_ERROR_MESSAGES;

const { USER_NOT_FOUND } = FIREBASE_ERROR_CODES;

const { throwError } = Errors;

const throwUnknownFirebaseError = (error: unknown) => {
  throwError((error as FirebaseError)?.code, { message: ERROR_MESSAGE });
};

export function makeFirebaseEmailVerificationService({ auth }: { auth: FirebaseAuthModule }) {
  return async ({ email }: { email: string }) => {
    await auth
      .getUserByEmail(email)
      .catch(async (error: unknown) => {
        if ((error as FirebaseError)?.code === USER_NOT_FOUND) throwError(USER_NOT_FOUND);
        else throwUnknownFirebaseError(error);
      })
      .then(async user => {
        if (user)
          await auth.updateUser(user.uid, { emailVerified: true }).catch((error: unknown) => {
            throwUnknownFirebaseError(error);
          });
      });
  };
}
