import { UseCases } from '../../dependency-injection';
import {
  LoginInputs,
  RegisterInput,
  VerifyPhoneNumberInputs,
  VerifyEmailInput,
} from '../../interfaces';

export const authService = {
  async login(input: LoginInputs) {
    return await UseCases.login(input);
  },

  async register(input: RegisterInput) {
    return await UseCases.register(input);
  },
  async verifyEmail(input: VerifyEmailInput) {
    return await UseCases.verifyEmail(input);
  },

  async verifyPhoneNumber(input: VerifyPhoneNumberInputs) {
    return await UseCases.verifyPhone(input);
  },
};
