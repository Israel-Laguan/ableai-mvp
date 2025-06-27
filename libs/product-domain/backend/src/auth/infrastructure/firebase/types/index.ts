import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

import type { User } from '@models/auth';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

export type FirebaseAddCustomClaimsDto = {
  userRecord: Omit<UserRecord, 'toJSON'>;
};

export interface FirebaseLoginInput {
  idToken: string;
}

export interface FirebaseLoginOutput {
  customToken: string;
}

export interface MakeFirebaseLoginServiceConfig {
  auth: FirebaseAuthModule;
}

export type FirebaseUpdateInput = {
  idTokenClaims: DecodedIdToken & Pick<User, 'id' | 'roleId'>;
};
