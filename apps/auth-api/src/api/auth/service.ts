import { UseCases } from '../../dependency-injection';
import { LoginInputs, RegisterInput } from '../../interfaces';

export const authService = {
  async login(input: LoginInputs) {
    return await UseCases.login(input);
  },

  async register(input: RegisterInput) {
    return await UseCases.register(input);
  },
};
