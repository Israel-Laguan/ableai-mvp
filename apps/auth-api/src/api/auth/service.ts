import { Services, UseCases } from '../../dependency-injection';
import { RegisterInput, verifyPhoneNumberInputs } from '../../interfaces';

export const authService = {
  async register(input: RegisterInput) {
    return await UseCases.register(input);
  },
  async verifyEmail(token: string) {
    const email = Services.jwtService.verifyToken(token)['email'];
    return await UseCases.verifyEmail({ email });
  },

  async verifyPhoneNumber(input: verifyPhoneNumberInputs) {
    return await UseCases.verifyPhone(input);
  },
};
