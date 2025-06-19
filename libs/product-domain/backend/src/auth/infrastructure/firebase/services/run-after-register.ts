import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { RunAfterRegister } from '../../../domain/services';
import type { FirebaseAddCustomClaimsDto } from '../types';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError } from '../errors';
import { UserClaims } from '@models/auth';

const ERROR_PATH = 'AUTH_CUSTOM_CLAIMS_SERVICE';

export function makeRunAfterRegisterService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): RunAfterRegister<FirebaseAddCustomClaimsDto, FirebaseAddCustomClaimsDto> {
  return async ({ privateDataUser, user, userRecord }) => {
    const { uid } = userRecord;

    const customClaims: UserClaims = {
      id: Number(user.id),
      roleId: Number(user.roleId),
      lastAppRole: null,
    };

    auth.setCustomUserClaims(uid, customClaims).catch((error: FirebaseError) => {
      throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
        message: 'Failed to set custom user claims',
      });
    });

    return {
      privateDataUser,
      user,
      userRecord,
    };
  };
}
