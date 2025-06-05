import { Auth, Shared } from '@product-domain/backend';
import { env } from '../../config/env.config';

const auth = Shared.Infra.Firebase.Modules.makeFirebaseAuthModule({
  serviceAccount: env.GOOGLE_APPLICATION_CREDENTIALS,
  appName: 'auth-api',
});

export const firebaseService = {
  register: Auth.Infra.Firebase.Services.makeFirebaseRegisterService({
    auth,
  }),
  verifyEmail: Auth.Infra.Firebase.Services.makeFirebaseEmailVerificationService({
    auth,
  }),
};
