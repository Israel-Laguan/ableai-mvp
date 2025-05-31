import { Shared as SharedDomainBackend } from '@product-domain/backend';
import { gigDb, gigMigrationsPath } from './gig';
import { privateGigDb, privateGigMigrationsPath } from './private-gig';

const {
  Infra: {
    Drizzle: {
      Utils: { runMigrations },
    },
  },
} = SharedDomainBackend;

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
