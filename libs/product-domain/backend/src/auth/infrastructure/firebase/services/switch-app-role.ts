import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { MakeSwitchAppRoleConfig } from '../../../domain/interfaces';
import type { SwitchAppRole } from '../../../domain/services';

import { APP_ROLE } from '@models/shared';
import { UserClaims } from '@models/auth';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError, throwInvalidCredentialsError } from '../errors';

const { BUYER, WORKER } = APP_ROLE;

const ERROR_PATH = 'AUTH_SWITCH_APP_ROLE_SERVICE';

export function makeFirebaseSwitchAppRoleService({
  auth,
  userRepository,
}: {
  auth: FirebaseAuthModule;
} & MakeSwitchAppRoleConfig): SwitchAppRole {
  return async input => {
    const { appRole, id, roleId } = input;

    const user = await userRepository
      .getById(String(id))
      .catch(() => throwError(FIREBASE_ERROR_CODES.UNKNOWN_ERROR, ERROR_PATH));

    if (!user) {
      throw throwInvalidCredentialsError(ERROR_PATH);
    }

    const customClaims: UserClaims = {
      id: Number(id),
      roleId: Number(roleId),
      appRole: appRole === WORKER ? BUYER : WORKER,
    };

    auth.setCustomUserClaims(user.uid, customClaims).catch((error: FirebaseError) => {
      throw throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
        message: 'Failed to set custom user claims',
      });
    });

    return void 0;
  };
}
