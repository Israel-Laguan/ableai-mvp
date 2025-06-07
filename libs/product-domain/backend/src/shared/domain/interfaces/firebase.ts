import type { auth, ServiceAccount } from 'firebase-admin';

export interface FirebasePhoneVerificationInput {
  idToken: string;
}

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

export type FirebaseUserRecord = auth.UserRecord;
