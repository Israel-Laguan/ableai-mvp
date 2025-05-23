import express from 'express';

import { Utils as UtilsBackend } from '@backend';
import { Shared as SharedDomainBackend } from '@product-domain/backend';

import { env } from './config/env.config';

const {
  Infra: {
    Drizzle: {
      Mocks: { users },
      Utils: { createDrizzleExpressCrudRouter, createDrizzlePostgresDbConnection, runMigrations },
    },
  },
} = SharedDomainBackend;

const { createMigrationsPath } = UtilsBackend;

// Db connection config

const gigDb = createDrizzlePostgresDbConnection({
  connectionString: env.GIG_DB_URL,
  environment: env.NODE_ENV,
});

const privateGigDb = createDrizzlePostgresDbConnection({
  connectionString: env.PRIVATE_GIG_DB_URL,
  environment: env.NODE_ENV,
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

// Api config

const globalPrefix = 'api/gig/v1';

const host = process.env.HOST ?? 'localhost';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

// Routers config

createDrizzleExpressCrudRouter({
  app,
  db: gigDb,
  table: users,
  prefix: `/${globalPrefix}/gig/users`,
});

createDrizzleExpressCrudRouter({
  app,
  db: privateGigDb,
  table: users,
  prefix: `/${globalPrefix}/private-gig/users`,
});

app.get('/' + globalPrefix, (req, res) => {
  res.send({ message: 'Hello Gig-API' });
});

// API startup

Promise.all([
  runMigrations({
    db: gigDb,
    migrationsFolder: gigMigrationsPath,
  }),
  runMigrations({
    db: privateGigDb,
    migrationsFolder: privateGigMigrationsPath,
  }),
])
  .catch(err => {
    console.error('Error during startup:', err);
    process.exit(1);
  })
  .then(() => {
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}/${globalPrefix}`);
    });
  });

export default app;
