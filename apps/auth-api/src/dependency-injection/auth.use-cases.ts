import { Auth } from '@product-domain/backend';

import { userRepository, privateDataUserRepository } from './shared';

export const registerUseCase = Auth.Application.makeRegisterUserUseCase(
  userRepository,
  privateDataUserRepository
);
