import * as admin from 'firebase-admin';

import { throwError } from '../errors';

interface FirebaseError {
  code: string;
}

export function makeFirebaseEmailVerificationService({ auth }: { auth: admin.auth.Auth }) {
  return async ({ email }: { email: string }) => {
    try {
      const user = await auth.getUserByEmail(email);

      const updateUser = await auth.updateUser(user.uid, { emailVerified: true });

      return {
        enabled: updateUser.emailVerified,
      };
    } catch (error: unknown) {
      return throwError((error as FirebaseError)?.code, { email });
    }
  };
}
