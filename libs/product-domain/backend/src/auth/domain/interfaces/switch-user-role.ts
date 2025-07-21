import type { User } from '@models/auth';
import type { UserRepository, RoleRepository } from '../repositories';
import type { RunInSwitchUserRole } from '../services/switch-user-role';

export interface MakeSwitchUserRoleConfig<
  CustomInput extends object = object,
  CustomOutput extends object = object
> {
  roleRepository: RoleRepository;
  runInSwitchUserRole?: RunInSwitchUserRole<CustomInput, CustomOutput>;
  userRepository: UserRepository;
}

export type RunInSwitchUserRoleInput<CustomInput extends object = object> = {
  user: User;
  customInput?: CustomInput;
};

export type SwitchUserRoleInput<CustomInput extends object = object> = {
  role: string;
  userId: string;
  customInput?: CustomInput;
};

export type SwitchUserRoleOutput<CustomOutput extends object = object> = {
  user: User;
  customOutput?: CustomOutput;
};
