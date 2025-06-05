import { Auth } from '@product-domain/backend';
import { privateDataUserRepository, userRepository } from '../repositories';
import { firebaseService } from '../services';

export const verifyEmail = Auth.App.MakeVerifyEmailUseCase({
  userRepository,
  privateDataUserRepository,
  runInEmailVerification: async ({ email }) => {
    await firebaseService.verifyEmail({ email });
  },
});
