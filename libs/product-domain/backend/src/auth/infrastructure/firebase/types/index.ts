import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import type { UserRecord } from 'firebase-admin/lib/auth/user-record';

import type { User } from '@models/auth';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

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
  idTokenClaims: DecodedIdToken & Pick<User, 'lastAppRole' | 'roleId'>;
};

export type FirebaseUpdateOutput = Omit<UserRecord, 'toJSON'> & {
  customToken: string;
};
