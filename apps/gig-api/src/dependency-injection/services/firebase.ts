import type { User } from '@models/auth';

import { Shared } from '@product-domain/backend';
import { env } from '../../config/env.config';

const {
  Modules: { makeFirebaseAuthModule },
  Services: { makeAuthorizationService },
} = Shared.Infra.Firebase;

const auth = makeFirebaseAuthModule({
  serviceAccount: env.GOOGLE_SERVICE_ACCOUNT,
  appName: 'auth-api',
});

export const firebaseService = {
  authorization: makeAuthorizationService<Pick<User, 'id' | 'roleId'>>({ auth }),
};
