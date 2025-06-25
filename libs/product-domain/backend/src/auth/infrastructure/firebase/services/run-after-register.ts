import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { RunAfterRegister } from '../../../domain/services';
import type { FirebaseAddCustomClaimsDto } from '../types';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError } from '../errors';
import { UserClaims } from '@models/auth';
import { APP_ROLE } from '@models/shared';

const ERROR_PATH = 'AUTH_CUSTOM_CLAIMS_SERVICE';

export function makeRunAfterRegisterService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): RunAfterRegister<FirebaseAddCustomClaimsDto, FirebaseAddCustomClaimsDto> {
  return async input => {
    const {
      userRecord: { uid },
      user: { id, roleId },
    } = input;

    const customClaims: UserClaims = {
      id: Number(id),
      roleId: Number(roleId),
      appRole: APP_ROLE.BUYER,
    };

    auth.setCustomUserClaims(uid, customClaims).catch((error: FirebaseError) => {
      throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
        message: 'Failed to set custom user claims',
      });
    });

    return {
      ...input,
    };
  };
}
