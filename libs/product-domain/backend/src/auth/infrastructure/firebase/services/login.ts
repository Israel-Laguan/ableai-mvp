import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import type { RunInLogin } from '../../../domain/services';

import { LOGIN_STATUS_CODE } from '../../../domain/constants';
import { FirebaseLoginInput, FirebaseLoginOutput, MakeFirebaseLoginServiceConfig } from '../types';

const { UNAUTHORIZED } = LOGIN_STATUS_CODE;

export function makeFirebaseLoginService({
  auth,
}: MakeFirebaseLoginServiceConfig): RunInLogin<FirebaseLoginInput, FirebaseLoginOutput> {
  return async ({ logAndResultLogin, ...input }) => {
    const { uid, email: FirebaseAuthEmail } = (await auth
      .verifyIdToken(input.idToken, true)
      .catch(() => {
        logAndResultLogin({
          loginStatus: UNAUTHORIZED,
        });
      })) as DecodedIdToken;

    const { user, email } = input;

    const { id, roleId, lastAppRole } = user;

    if (FirebaseAuthEmail !== email) {
      logAndResultLogin({
        loginStatus: UNAUTHORIZED,
      });
    }

    const newIdToken = await auth.createCustomToken(uid, { id, roleId, lastAppRole }).catch(() => {
      return logAndResultLogin({
        loginStatus: UNAUTHORIZED,
      }) as never;
    });

    return {
      idToken: newIdToken,
    };
  };
}
