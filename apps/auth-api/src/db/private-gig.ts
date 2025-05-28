import { Auth, Shared } from '@product-domain/backend';
import { env } from '../config/env.config';
import { Utils } from '@backend';

const {
  Infra: {
    Drizzle: {
      Utils: { createDrizzlePostgresDbConnection },
    },
  },
} = Shared;

const {
  Infra: {
    Drizzle: {
      Repositories: { makePrivateDataUserRepository },
    },
  },
} = Auth;

const { createMigrationsPath } = Utils;

export const privateGigDb = createDrizzlePostgresDbConnection({
  poolConfig: { connectionString: env.PRIVATE_GIG_DB_URL },
});

export const privateDataUserRepository = makePrivateDataUserRepository(privateGigDb);

export const privateGigMigrationsPath = createMigrationsPath({
  framework: 'drizzle',
  finalPathPattern: 'private-gig-migrations',
  validateExists: true,
});
