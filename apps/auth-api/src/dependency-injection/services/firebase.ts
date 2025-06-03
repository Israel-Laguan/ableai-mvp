import { Shared } from '@product-domain/backend';
import { env } from '../../config/env.config';
import { sendEmailLink } from './nodemailer';

const auth = Shared.Infra.Firebase.Modules.makeFirebaseAuthModule({
  appName: 'auth-api',
  serviceAccount: {
    projectId: env.GOOGLE_APPLICATION_CREDENTIALS.projectId,
    clientEmail: env.GOOGLE_APPLICATION_CREDENTIALS.clientEmail,
    privateKey: env.GOOGLE_APPLICATION_CREDENTIALS.privateKey,
  },
});

export const emailLinkService = Shared.Infra.Firebase.Services.makeFirebaseEmailLinkService({
  auth,
  sendEmailLink,
});

export const thirdPartyEmailVerification =
  Shared.Infra.Firebase.Services.makeFirebaseEmailVerificationService({
    auth,
  });
