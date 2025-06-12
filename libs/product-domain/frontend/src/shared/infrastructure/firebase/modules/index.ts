import type { FirebaseOptions, FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export function makeFirebaseAuthModule(config?: FirebaseOptions & { appName?: string }): Auth {
  let app: FirebaseApp;
  const appName = config?.appName || '[DEFAULT]';
  const existingApp = getApps().find(a => a.name === appName);

  if (existingApp) {
    app = existingApp;
  } else {
    app = initializeApp(config || {}, appName);
  }

  const auth = getAuth(app);

  return auth;
}
