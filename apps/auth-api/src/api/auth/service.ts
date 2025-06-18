import { Auth } from '@product-domain/backend';
import { UseCases } from '../../dependency-injection';
import { LoginInput, RegisterInput, UpdateInput } from '../../interfaces';

export const authService = {
  async login(input: LoginInput) {
    return await UseCases.login(input);
  },

  async register(input: RegisterInput) {
    return await UseCases.register(input);
  },

  async update(input: Auth.Domain.Interfaces.UpdateInput<UpdateInput>) {
    return await UseCases.update(input);
  },
};
