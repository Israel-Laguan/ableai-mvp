import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { Errors } from '@shared';
import type { FirebaseAuthModule } from '../../../domain/modules';

export function makeAuthorizationService<CustomClaims extends object = object>({
  auth,
}: {
  auth: FirebaseAuthModule;
}) {
  return async (token: string): Promise<DecodedIdToken & CustomClaims> =>
    auth
      .verifyIdToken(token, true)
      .then(response => response as DecodedIdToken & CustomClaims)
      .catch(() => {
        throw Errors.UnauthorizeError.create('Invalid token', 'FIREBASE_AUTHORIZATION_SERVICE');
      });
}
