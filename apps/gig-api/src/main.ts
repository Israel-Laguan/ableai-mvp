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
  poolConfig: { connectionString: env.GIG_DB_URL },
});

const gigMigrationsPath = createMigrationsPath({
  framework: 'drizzle',
  finalPathPattern: 'gig-db',
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

app.get('/' + globalPrefix, (req, res) => {
  res.send({ message: 'Hello Gig-API' });
});

// API startup

Promise.all([
  runMigrations({
    db: gigDb,
    migrationsFolder: gigMigrationsPath,
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
