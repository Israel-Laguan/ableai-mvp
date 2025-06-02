import * as admin from 'firebase-admin';

import type { DependencyInjection as AuthDependencyInjection } from '@models/auth';
import type { DependencyInjection } from '../../../domain';
import { throwError } from '../errors';

interface FirebaseError {
  code: string;
}

export function makeFirebaseEmailLinkService({
  auth,
  redirectAfterRegisterUrl,
  sendEmailLinkService,
}: {
  auth: admin.auth.Auth;
  redirectAfterRegisterUrl: string;
  sendEmailLinkService: DependencyInjection.Services.SendEmailLinkService;
}): AuthDependencyInjection.ThirdPartyEmailLinkServices {
  const actionCodeSettings: admin.auth.ActionCodeSettings = {
    url: redirectAfterRegisterUrl,
    handleCodeInApp: true,
  };

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
        const link = await auth.generateEmailVerificationLink(email, actionCodeSettings);
        await sendEmailLinkService({
          to: email,
          link,
        });
      } catch (error: unknown) {
        await rollbackThirdPartyEmailRegistration();
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
