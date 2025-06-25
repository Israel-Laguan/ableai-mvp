import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import type { RunInLogin } from '../../../domain/services';

import { LOGIN_STATUS_CODE, ROLES } from '../../../domain/constants';
import { FirebaseLoginInput, FirebaseLoginOutput, MakeFirebaseLoginServiceConfig } from '../types';

const { UNAUTHORIZED } = LOGIN_STATUS_CODE;

export function makeFirebaseLoginService({
  auth,
}: MakeFirebaseLoginServiceConfig): RunInLogin<FirebaseLoginInput, FirebaseLoginOutput> {
  return async ({ logAndResultLogin, ...input }) => {
    const { uid } = (await auth.verifyIdToken(input.idToken, true).catch(() => {
      logAndResultLogin({
        loginStatus: UNAUTHORIZED,
      });
    })) as DecodedIdToken;

    const { user } = input;

    const { id, roleId } = user;

    const customToken = await auth
      .createCustomToken(uid, { id, roleId, appRole: ROLES.USER })
      .catch(() => {
        return logAndResultLogin({
          loginStatus: UNAUTHORIZED,
        }) as never;
      });

    return {
      customToken,
    };
  };
}
