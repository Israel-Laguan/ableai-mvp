import { User } from '@models/auth';
import { Auth } from '@product-domain/backend';
import { privateDataUserRepository, userRepository } from '../repositories';
import { jwtService } from '../services';

const verifyEmail = Auth.App.MakeVerifyEmailUseCase({
  userRepository,
  privateDataUserRepository,
});

export async function verifyEmailUseCase(token: string): Promise<User[]> {
  const email = jwtService.verifyToken(token)['email'];
  return await verifyEmail({ email });
}
