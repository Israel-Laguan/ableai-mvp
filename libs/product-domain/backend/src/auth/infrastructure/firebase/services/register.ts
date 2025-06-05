import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError } from '../errors';

const { USER_NOT_FOUND, UNKNOWN_ERROR } = FIREBASE_ERROR_CODES;

export function makeFirebaseRegisterService({ auth }: { auth: FirebaseAuthModule }) {
  return async ({ email }: { email: string }) => {
    await auth.getUserByEmail(email).catch(async (error: unknown) => {
      if ((error as FirebaseError)?.code === USER_NOT_FOUND) {
        await auth.createUser({
          email,
          emailVerified: false,
        });
      } else {
        throwError(UNKNOWN_ERROR);
      }
    });
  };
}
