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
  connectionString: env.GIG_DB_URL,
});

export const privateGigDb = createDrizzlePostgresDbConnection({
  connectionString: env.PRIVATE_GIG_DB_URL,
});

const gigMigrationsPath = createMigrationsPath({
  domainContext: 'shared',
  framework: 'drizzle',
  finalPathPattern: 'gig-migrations',
  validateExists: true,
});

const privateGigMigrationsPath = createMigrationsPath({
  domainContext: 'shared',
  framework: 'drizzle',
  finalPathPattern: 'private-gig-migrations',
  validateExists: true,
});

export const initDatabase = () =>
  Promise.all([
    runMigrations({
      db: gigDb,
      migrationsFolder: gigMigrationsPath,
    }),
    runMigrations({
      db: privateGigDb,
      migrationsFolder: privateGigMigrationsPath,
    }),
  ]);
