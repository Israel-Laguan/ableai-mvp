import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { PrivateDataUser } from '@models/auth';
import { Infra } from '../../../../shared';
import { privateDataUser } from '../schemas';

const {
  Drizzle: {
    Repositories: { makeDrizzleBaseRepository },
  },
} = Infra;

export const makePrivateDataUserRepository = (em: NodePgDatabase) =>
  makeDrizzleBaseRepository<PrivateDataUser>({
    em,
    schema: privateDataUser,
  });
