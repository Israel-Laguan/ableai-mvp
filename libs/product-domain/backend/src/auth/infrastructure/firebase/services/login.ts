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

    const { id, loginAttempts = 0 } = user;

    if (FirebaseAuthEmail !== email) {
      await input.userRepository.updateById(String(id), {
        loginAttempts: loginAttempts + 1,
      });

      logAndResultLogin({
        loginStatus: UNAUTHORIZED,
      });
    }

    const newIdToken = await auth.createCustomToken(uid, { id, roleId: user.roleId }).catch(() => {
      return logAndResultLogin({
        loginStatus: UNAUTHORIZED,
      }) as never;
    });

    return {
      idToken: newIdToken,
    };
  };
}
