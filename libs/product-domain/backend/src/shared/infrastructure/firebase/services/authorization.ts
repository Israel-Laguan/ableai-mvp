import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { Errors } from '@shared';
import type { FirebaseAuthModule } from '../../../domain/modules';

export function makeAuthorizationService<CustomClaims extends object = object>({
  auth,
}: {
  auth: FirebaseAuthModule;
}) {
  return async (token: string): Promise<DecodedIdToken & CustomClaims> => {
    return (await auth.verifyIdToken(token, true).catch(() => {
      throw Errors.UnauthorizeError.create('Invalid token', 'FIREBASE_AUTHORIZATION_SERVICE');
    })) as DecodedIdToken & CustomClaims;
  };
}
