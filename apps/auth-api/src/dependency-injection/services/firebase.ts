import { Shared } from '@product-domain/backend';
import { env } from '../../config/env.config';
import { sendEmailService } from './nodemailer';

export const emailLinkService = Shared.Infra.Firebase.makeFirebaseEmailLinkService({
  appName: 'auth-api',
  redirectAfterRegisterUrl: env.REDIRECT_AFTER_REGISTER_URL,
  serviceAccount: {
    projectId: env.GOOGLE_APPLICATION_CREDENTIALS.projectId,
    clientEmail: env.GOOGLE_APPLICATION_CREDENTIALS.clientEmail,
    privateKey: env.GOOGLE_APPLICATION_CREDENTIALS.privateKey,
  },
  sendEmailService,
});
