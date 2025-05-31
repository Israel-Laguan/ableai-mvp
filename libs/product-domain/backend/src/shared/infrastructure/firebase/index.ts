import * as admin from 'firebase-admin';

import { Errors } from '@shared';
import type { DependencyInjection as AuthDependencyInjection } from '@models/auth';
import type { DependencyInjection } from '../../domain';

interface FirebaseErrorInputs {
  email?: string;
  uri?: string;
}

interface FirebaseError {
  code: string;
}

const { throwError } = Errors.makeErrorRunner<FirebaseErrorInputs>({
  'auth/email-already-exists': ({ email }) =>
    Errors.AlreadyExistError.create(
      `The email '${email}' is already in use by another account.`,
      'FIREBASE_REGISTER'
    ),

  'auth/invalid-email': ({ email }) =>
    Errors.BadRequestError.create(`The email '${email}' is not valid.`, 'FIREBASE_REGISTER'),

  'auth/user-not-found': () =>
    Errors.NotFoundResourceError.create(
      'No user found with the provided email address.',
      'FIREBASE_REGISTER'
    ),

  'auth/unauthorized-continue-uri': ({ uri }) =>
    Errors.InternalServerError.create(
      `The continue URL '${uri}' is not authorized.`,
      'FIREBASE_REGISTER'
    ),
});

export function makeFirebaseEmailLinkService({
  appName,
  redirectAfterRegisterUrl,
  sendEmailService,
  serviceAccount,
}: {
  appName?: string;
  redirectAfterRegisterUrl: string;
  sendEmailService: DependencyInjection.SendEmailService;
  serviceAccount: admin.ServiceAccount;
}): AuthDependencyInjection.ThirdPartyEmailLinkServices {
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

  const auth = admin.auth(app);

  console.log('Firebase app initialized:', app ? app.name : 'No app initialized');

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
        await sendEmailService({
          to: email,
          subject: 'Verify your email address',
          html: `<p>Click the link below to verify your email address:</p>
                 <a href="${link}">Verify Email</a>`,
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
