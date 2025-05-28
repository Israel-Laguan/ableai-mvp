import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { User } from '@models/auth';
import { Infra } from '../../../../shared';
import { users } from '../schemas';

const {
  Drizzle: {
    Repositories: { makeDrizzleBaseRepository },
  },
} = Infra;

export const makeUserRepository = (em: NodePgDatabase) =>
  makeDrizzleBaseRepository<User>({
    em,
    schema: users,
  });
