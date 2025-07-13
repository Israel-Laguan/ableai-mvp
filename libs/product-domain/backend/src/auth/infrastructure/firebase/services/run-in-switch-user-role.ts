import type { UserClaims } from '@models/auth';
import type { Modules } from '../../../../shared/domain';
import type { Services } from '../../../domain';

import { Errors } from '@shared';

const PATH = 'FIREBASE_SWITCH_USER_ROLE';

export function MakeFirebaseSwitchUserRoleUseCase({
  auth,
}: {
  auth: Modules.FirebaseAuthModule;
}): Services.RunInSwitchUserRole<UserClaims> {
  return async ({ user, customInput }) => {
    if (!customInput || !user) {
      throw Errors.BadRequestError.create(
        'Custom input and user are required for switching user role',
        PATH
      );
    }

    const { appRole } = customInput;

    const { uid, id, roleId } = user;

    const newCustomClaims: UserClaims = {
      id: Number(id),
      roleId: Number(roleId),
      appRole,
    };

    auth.setCustomUserClaims(uid, newCustomClaims).catch(() => {
      throw Errors.InternalServerError.create('Failed to set custom user claims', PATH);
    });

    return {};
  };
}
