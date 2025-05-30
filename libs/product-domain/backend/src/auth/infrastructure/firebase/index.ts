import * as admin from 'firebase-admin';

import { Errors } from '@shared';
import { DependencyInjection } from '../../domain';

const errorCodeMap: Record<string, Error> = {
  'auth/email-already-exists': Errors.AlreadyExistError.create(
    'The email address is already in use by another account.',
    'FIREBASE_REGISTER'
  ),

  'auth/invalid-email': Errors.BadRequestError.create(
    'The email address is not valid.',
    'FIREBASE_REGISTER'
  ),

  'auth/user-not-found': Errors.NotFoundResourceError.create(
    'No user found with the provided email address.',
    'FIREBASE_REGISTER'
  ),

  'auth/unauthorized-continue-uri': Errors.InternalServerError.create(
    'The continue URL is not authorized.',
    'FIREBASE_REGISTER'
  ),
};

function makeError(error: unknown): Error {
  if (error instanceof Error && 'code' in error) {
    const errorCode = (error as { code: string }).code;

    return (
      errorCodeMap[errorCode] ||
      Errors.InternalServerError.create(`Firebase error: ${errorCode}`, 'FIREBASE_REGISTER')
    );
  }

  return Errors.InternalServerError.create('Unknown error', 'FIREBASE_REGISTER');
}

export function makeFirebaseEmailLinkService({
  appName,
  redirectAfterRegisterUrl,
  serviceAccount,
}: {
  appName?: string;
  redirectAfterRegisterUrl: string;
  serviceAccount: admin.ServiceAccount;
}): DependencyInjection.ThirdPartyEmailLinkServices {
  let app: admin.app.App | undefined;

  if (!admin.apps.length) {
    app = admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount),
      },
      appName || 'default'
    );
  }

  const actionCodeSettings: admin.auth.ActionCodeSettings = {
    url: redirectAfterRegisterUrl,
    handleCodeInApp: true,
  };

  /* const auth = admin.auth(app); */

  const auth = admin.auth();

  console.log('Firebase app initialized:', app ? app.name : 'No app initialized');

  return async ({ email }: { email: string }) => {
    let user: admin.auth.UserRecord | null = null;

    try {
      await auth.getUserByEmail(email);
    } catch (error: unknown) {
      if ((error as { code: string })?.code === 'auth/user-not-found') {
        user = await auth.createUser({
          email,
          emailVerified: false,
        });
      } else {
        throw makeError(error);
      }
    }

    const rollbackThirdPartyEmailRegistration = async () => {
      try {
        await auth.deleteUser(user?.uid || '');
      } catch (rollbackError: unknown) {
        throw makeError(rollbackError);
      }
    };

    const sendVerificationEmailLink = async () => {
      try {
        await auth.generateSignInWithEmailLink(email, actionCodeSettings);
      } catch (sendError: unknown) {
        await rollbackThirdPartyEmailRegistration();
        throw makeError(sendError);
      }
    };

    return {
      sendVerificationEmailLink,
      rollbackThirdPartyEmailRegistration,
    };
  };
}
