import type { User, Infra } from '@models/auth';
import type { ISQLBaseRepository } from '@models/shared';

type UserRepositoryBase = ISQLBaseRepository<User>;

export interface UserRepository extends Omit<UserRepositoryBase, 'create'> {
  create: (userInput: Infra.UserCreateInput) => Promise<User[]>;
}
