import * as admin from 'firebase-admin';

import type { FirebaseModuleConfig } from '../../../domain/interfaces';

export function makeFirebaseAuthModule({
  appName,
  serviceAccount,
}: FirebaseModuleConfig): admin.auth.Auth {
  let app: admin.app.App | undefined;

  if (!admin.apps.length) {
    app = admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount),
      },
      appName || 'default'
    );
  }

  console.log('Firebase auth module initialized:', app ? app.name : 'No auth module initialized');

  return admin.auth(app);
}
