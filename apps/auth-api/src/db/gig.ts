import { Utils } from '@backend';
import { Auth, Shared } from '@product-domain/backend';
import { env } from '../config/env.config';

const {
  Infra: {
    Drizzle: {
      Repositories: { makeUserRepository },
    },
  },
} = Auth;

const {
  Infra: {
    Drizzle: {
      Utils: { createDrizzlePostgresDbConnection },
    },
  },
} = Shared;

const { createMigrationsPath } = Utils;

export const gigDb = createDrizzlePostgresDbConnection({
  poolConfig: { connectionString: env.GIG_DB_URL },
});

export const userRepository = makeUserRepository(gigDb);

export const gigMigrationsPath = createMigrationsPath({
  framework: 'drizzle',
  finalPathPattern: 'gig-db',
  validateExists: true,
});
