import { User } from '@models/auth';
import { Auth } from '@product-domain/backend';
import { Errors } from '@shared';
import { privateDataUserRepository, userRepository } from '../repositories';
import { jwtService, thirdPartyEmailVerification } from '../services';

const verifyEmail = Auth.App.MakeVerifyEmailUseCase({
  userRepository,
  privateDataUserRepository,
});

export async function verifyEmailUseCase(token: string): Promise<User[]> {
  const email = jwtService.verifyToken(token)['email'];

  const isVerified = await thirdPartyEmailVerification({
    email,
  });

  if (!isVerified.enabled) {
    throw Errors.UnauthorizeError.create(
      'Email verification failed',
      'EMAIL_VERIFICATION_USE_CASE'
    );
  }

  return await verifyEmail({ email });
}
