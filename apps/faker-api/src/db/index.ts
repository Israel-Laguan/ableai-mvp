import { Shared as SharedDomainBackend } from '@product-domain/backend';
import { env } from '../config/env.config';

const {
  Infra: {
    Drizzle: {
      Utils: { createDrizzlePostgresDbConnection },
    },
  },
} = SharedDomainBackend;

export const gigDb = createDrizzlePostgresDbConnection({
  poolConfig: { connectionString: env.GIG_DB_URL },
});

export const privateGigDb = createDrizzlePostgresDbConnection({
  poolConfig: { connectionString: env.PRIVATE_GIG_DB_URL },
});
