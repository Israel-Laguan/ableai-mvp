import express from 'express';

import { Shared as SharedDomainBackend } from '@ableai/product-domain/backend';
import { Shared as SharedBackend } from '@backend';
import { env } from './config/env.config';

const {
  Infrastructure: {
    Drizzle: {
      Mocks: { users },
      Utils: { createDrizzleExpressCrudRouter, createDrizzlePostgresDbConnection, runMigrations },
    },
  },
} = SharedDomainBackend;

const {
  Utils: { createMigrationsPath },
} = SharedBackend;

// Db connection config

const gigDb = createDrizzlePostgresDbConnection({
  connectionString: env.GIG_DB_URL,
});

const privateGigDb = createDrizzlePostgresDbConnection({
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

// Api config

const globalPrefix = 'api/ai-manager-api/main';

const host = process.env.HOST ?? 'localhost';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

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
  res.send({ message: 'Hello Ai-Manager-API' });
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
