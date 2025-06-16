import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

export interface FirebaseLoginInput {
  idToken: string;
}

export interface FirebaseLoginOutput {
  idToken: string;
}

export interface MakeFirebaseLoginServiceConfig {
  auth: FirebaseAuthModule;
}
