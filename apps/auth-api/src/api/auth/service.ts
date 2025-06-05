import { Infra } from '@models/auth';
import { Services, UseCases } from '../../dependency-injection';

export const authService = {
  async register(input: Infra.RegisterInput) {
    await UseCases.register(input);
  },
  async verifyEmail(token: string) {
    const email = Services.jwtService.verifyToken(token)['email'];
    await UseCases.verifyEmail({ email });
  },
};
