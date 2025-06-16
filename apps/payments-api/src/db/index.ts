import { Utils as UtilsBackend } from '@backend';
import { Shared as SharedDomainBackend } from '@product-domain/backend';

const {
  Infra: {
    Drizzle: {
      Utils: { createDrizzlePostgresDbConnection, runMigrations },
    },
  },
} = SharedDomainBackend;

import { env } from '../config/env.config';

const { createMigrationsPath } = UtilsBackend;

export const gigDb = createDrizzlePostgresDbConnection({
  poolConfig: {
    connectionString: env.GIG_DB_URL,
  },
});

export const privateGigDb = createDrizzlePostgresDbConnection({
  poolConfig: {
    connectionString: env.GIG_DB_URL,
  },
});

const gigMigrationsPath = createMigrationsPath({
  framework: 'drizzle',
  finalPathPattern: 'gig-db',
  validateExists: true,
});

export const initDatabase = () =>
  Promise.all([
    runMigrations({
      db: gigDb,
      migrationsFolder: gigMigrationsPath,
    }),
  ]);
