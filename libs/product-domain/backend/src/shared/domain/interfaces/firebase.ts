import type { ServiceAccount } from 'firebase-admin';

export interface FirebaseError {
  code: string;
}

export interface FirebaseErrorInputs {
  message?: string;
  uri?: string;
}

export interface FirebaseModuleConfig {
  appName?: string;
  serviceAccount: ServiceAccount;
}
