import type { User } from '@models/auth';

import { Auth, Shared } from '@product-domain/backend';
import { env } from '../../config/env.config';
import { userRepository } from '../repositories';

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
  authorization: makeAuthorizationService<Pick<User, 'id' | 'roleId'>>({ auth }),

  runAfterRegister: services.makeRunAfterRegisterService({ auth }),

  runBeforeRegister: services.makeRunBeforeRegisterService({ auth }),

  switchAppRole: services.makeFirebaseSwitchAppRoleService({
    auth,
    userRepository,
  }),

  update: services.makeFirebaseUpdateService({
    auth,
  }),
};
