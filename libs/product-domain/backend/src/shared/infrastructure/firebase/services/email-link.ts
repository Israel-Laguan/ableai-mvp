import * as admin from 'firebase-admin';

import type { DependencyInjection as AuthDependencyInjection } from '@models/auth';
import type { DependencyInjection } from '../../../domain';
import { throwError } from '../errors';

interface FirebaseError {
  code: string;
}

export function makeFirebaseEmailLinkService({
  auth,
  createEmailToken,
  redirectAfterRegisterUrl,
  sendEmailLink,
}: {
  auth: admin.auth.Auth;
  createEmailToken: DependencyInjection.Services.CreateEmailTokenService;
  redirectAfterRegisterUrl: string;
  sendEmailLink: DependencyInjection.Services.SendEmailLinkService;
}): AuthDependencyInjection.ThirdPartyEmailLinkServices {
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
        const emailToken = createEmailToken({
          email,
        });

        await sendEmailLink({
          to: email,
          link: redirectAfterRegisterUrl + `?email=${encodeURIComponent(emailToken)}`,
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
