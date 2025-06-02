import { Errors } from '@shared';
import type { Infra, PrivateDataUser, User } from '@models/auth';
import type { Repositories } from '../domain';

const { throwError } = Errors.makeErrorRunner<{ email?: string }>({
  'not-found': ({ email }) =>
    Errors.NotFoundResourceError.create(`User ${email} not found.`, 'EMAIL_VERIFICATION_REGISTER'),
});

export function MakeVerifyEmailUseCase(config: {
  userRepository: Repositories.UserRepository;
  privateDataUserRepository: Repositories.PrivateDataUserRepository;
}) {
  return async ({ email }: Pick<Infra.RegisterInput, 'email'>): Promise<User[]> => {
    const { userRepository, privateDataUserRepository } = config;

    const user = await privateDataUserRepository.getByEmail({ email });

    if (!user) throwError('not-found', { email });

    const result = await userRepository.updateByPrivateDataUserId((user as PrivateDataUser).id, {
      enabled: true,
    });

    return result;
  };
}
