import { Auth } from '@product-domain/backend';
import { roleRepository, userRepository } from '../repositories';
import { firebaseService } from '../services';

export const switchUserRole = Auth.App.MakeSwitchUserRoleUseCase({
  roleRepository,
  userRepository,
  runInSwitchUserRole: firebaseService.runInSwitchUserRole,
});
