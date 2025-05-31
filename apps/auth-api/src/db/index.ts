import { Utils } from '@backend';
import { Shared as SharedDomainBackend } from '@product-domain/backend';
import { env } from '../config/env.config';

const {
  Infra: {
    Drizzle: {
      Utils: { runMigrations, createDrizzlePostgresDbConnection },
    },
  },
} = SharedDomainBackend;

const { createMigrationsPath } = Utils;

const privateGigMigrationsPath = createMigrationsPath({
  framework: 'drizzle',
  finalPathPattern: 'private-gig-db',
  validateExists: true,
});
const gigMigrationsPath = createMigrationsPath({
  framework: 'drizzle',
  finalPathPattern: 'gig-db',
  validateExists: true,
});

export const gigDb = createDrizzlePostgresDbConnection({
  poolConfig: { connectionString: env.GIG_DB_URL },
});

export const privateGigDb = createDrizzlePostgresDbConnection({
  poolConfig: { connectionString: env.PRIVATE_GIG_DB_URL },
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
