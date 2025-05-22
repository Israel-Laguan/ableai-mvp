/* eslint-disable no-unused-vars */
import type { User, Infra } from '@models/auth';

import { type Domain as SharedDomain } from '../../shared';

type UserRepositoryBase = SharedDomain.ISQLBaseRepository<User>;

// TODO: Repair Lint for Types
export interface UserRepository extends Omit<UserRepositoryBase, 'create'> {
  create: (userInput: Infra.UserCreateInput) => Promise<User[]>;
}
