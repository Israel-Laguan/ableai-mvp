import * as admin from 'firebase-admin';

import type { DependencyInjection } from '../../../domain';
import { throwError } from '../errors';

interface FirebaseError {
  code: string;
}

export function makeFirebaseEmailLinkService({
  auth,
  sendEmailLink,
}: {
  auth: admin.auth.Auth;
  sendEmailLink: DependencyInjection.Services.SendEmailLink;
}) {
  return async ({ email }: { email: string }) => {
    let user: admin.auth.UserRecord | null = null;

    try {
      await auth.getUserByEmail(email);
    } catch (error: unknown) {
      if ((error as FirebaseError)?.code === 'auth/user-not-found') {
        user = await auth.createUser({
          email,
          emailVerified: false,
        });
      } else {
        throwError((error as FirebaseError)?.code, { email });
      }
    }

    const rollbackThirdPartyEmailRegistration = async () => {
      try {
        await auth.deleteUser(user?.uid || '');
      } catch (error: unknown) {
        throwError((error as FirebaseError)?.code, {
          email,
        });
      }
    };

    const sendVerificationEmailLink = async () => {
      try {
        await sendEmailLink({
          email,
        });
      } catch (error: unknown) {
        throwError((error as FirebaseError)?.code, {
          email,
        });
      }
    };

    return {
      sendVerificationEmailLink,
      rollbackThirdPartyEmailRegistration,
    };
  };
}
