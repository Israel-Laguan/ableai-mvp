import { Infra } from '@models/auth';

import { Services, UseCases } from '../../dependency-injection';

async function register(input: Infra.RegisterInput) {
  await UseCases.register(input);
  await Services.firebaseService.register(input);
}

async function verifyEmail(token: string) {
  const email = Services.jwtService.verifyToken(token)['email'];
  await UseCases.verifyEmail({ email });
  await Services.firebaseService.verifyEmail({ email });
}

export const authService = {
  register,
  verifyEmail,
};
