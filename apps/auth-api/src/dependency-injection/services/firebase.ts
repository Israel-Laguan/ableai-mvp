import type { User } from '@models/auth';

import { Auth, Shared } from '@product-domain/backend';
import { env } from '../../config/env.config';

const {
  Modules: { makeFirebaseAuthModule },
  Services: { makeAuthorizationService },
} = Shared.Infra.Firebase;

const auth = makeFirebaseAuthModule({
  serviceAccount: env.GOOGLE_SERVICE_ACCOUNT,
  appName: 'auth-api',
});

const services = Auth.Infra.Firebase.Services;

export const firebaseService = {
  authorization: makeAuthorizationService<Pick<User, 'id' | 'lastAppRole' | 'roleId'>>({ auth }),

  runAfterRegister: services.makeRunAfterRegisterService({ auth }),

  runBeforeRegister: services.makeRunBeforeRegisterService({ auth }),

  update: services.makeFirebaseUpdateService({
    auth,
  }),
};
