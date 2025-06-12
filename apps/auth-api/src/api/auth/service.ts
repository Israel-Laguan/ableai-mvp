import { UseCases } from '../../dependency-injection';
import { LoginInput, RegisterInput } from '../../interfaces';

export const authService = {
  async login(input: LoginInput) {
    return await UseCases.login(input);
  },

  async register(input: RegisterInput) {
    return await UseCases.register(input);
  },
};
