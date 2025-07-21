import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'SWITCH_USER_ROLE';

export function MakeSwitchUserRoleUseCase<
  ServiceInput extends object = object,
  ServiceOutput extends object = object
>({
  userRepository,
  roleRepository,
  runInSwitchUserRole,
}: Interfaces.MakeSwitchUserRoleConfig<ServiceInput, ServiceOutput>): UseCases.SwitchUserRole<
  ServiceInput,
  ServiceOutput
> {
  return async ({ role, userId, customInput }) => {
    const user = await userRepository.getById(userId);

    if (!user) {
      throw Errors.NotFoundResourceError.create(`User with ID ${userId} not found`, PATH);
    }

    const roleEntity = (
      await roleRepository.getAll({
        limit: 1,
        where: {
          fields: [{ field: 'name', value: role }],
        },
      })
    ).results[0];

    if (!roleEntity?.id) {
      throw Errors.NotFoundResourceError.create(`Role ${role} not found`, PATH);
    }

    const { success } = await userRepository.updateById(String(user.id), { roleId: roleEntity.id });

    if (!success) {
      throw Errors.InternalServerError.create(
        `Failed to switch user role for user with ID ${userId}`,
        PATH
      );
    }

    user.roleId = roleEntity.id;

    const customOutput = runInSwitchUserRole
      ? await runInSwitchUserRole({ customInput, user })
      : ({} as ServiceOutput);

    return { customOutput, user };
  };
}
