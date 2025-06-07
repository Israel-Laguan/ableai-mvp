import { Auth, Shared } from '@product-domain/backend';
import { env } from '../../config/env.config';
import { resendService } from './resend';
import { makeVerifyEmailHTML } from '../html';
import { jwtService } from './jwt';

const auth = Shared.Infra.Firebase.Modules.makeFirebaseAuthModule({
  serviceAccount: env.GOOGLE_SERVICE_ACCOUNT,
  appName: 'auth-api',
});

export const firebaseService = {
  register: Auth.Infra.Firebase.Services.makeFirebaseRegisterService({
    auth,
  }),

  sendEmailLink: Auth.Infra.Firebase.Services.makeFirebaseSendEmailLinkService({
    auth,
    createEmailVerificationToken(input: { email: string }) {
      return jwtService.createToken(input, '1 hour');
    },
    makeVerifyEmailHTML,
    redirectionUrl: env.REDIRECT_AFTER_REGISTER_URL,
    sendEmail: resendService.sendEmail,
    subject: 'Verify your email address',
  }),

  verifyEmail: Auth.Infra.Firebase.Services.makeFirebaseEmailVerificationService({
    auth,
  }),

  verifyPhone: Auth.Infra.Firebase.Services.makeFirebasePhoneVerificationService({
    auth,
  }),
};
