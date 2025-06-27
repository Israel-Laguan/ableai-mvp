import { UseCases, Services } from '../../dependency-injection';
import { LoginInput, RegisterInput, SwitchAppRoleInput, UpdateInput } from '../../interfaces';

export const authService = {
  async login(input: LoginInput) {
    return await UseCases.login(input);
  },

  async register(input: RegisterInput) {
    return await UseCases.register(input);
  },

  async switchAppRole(input: SwitchAppRoleInput) {
    return await Services.firebaseService.switchAppRole(input);
  },

  async updateUser(input: UpdateInput) {
    return await UseCases.updateUser(input);
  },
};
