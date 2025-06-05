import { Auth } from '@product-domain/backend';
import { privateDataUserRepository, userRepository } from '../repositories';

export const verifyEmail = Auth.App.MakeVerifyEmailUseCase({
  userRepository,
  privateDataUserRepository,
});
