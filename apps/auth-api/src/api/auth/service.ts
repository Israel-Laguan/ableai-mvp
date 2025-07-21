import { UseCases } from '../../dependency-injection';
import { LoginInput, RegisterInput, SwitchUserRoleInput, UpdateInput } from '../../interfaces';

export const authService = {
  async login(input: LoginInput) {
    return await UseCases.login(input);
  },

  async register(input: RegisterInput) {
    return await UseCases.register(input);
  },

  async switchUserRole(input: SwitchUserRoleInput) {
    return await UseCases.switchUserRole(input);
  },

  async updateUser(input: UpdateInput) {
    return await UseCases.updateUser(input);
  },
};
