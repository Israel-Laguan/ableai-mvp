import express from 'express';

import { Drizzle, Shared } from '@backend';
import { env } from './config/env.config';
import { users } from './schema';

// Db connection config

const {
  Utils: {
    createDrizzleExpressSampleCrudRouter,
    createDrizzleVercelDbConnection,

    runMigrations,
  },
} = Drizzle;
const {
  Utils: { createMigrationsPath },
} = Shared;

const gig_db = createDrizzleVercelDbConnection({
  connectionString: env.GIG_DB_URL,
});

const private_gig_db = createDrizzleVercelDbConnection({
  connectionString: env.PRIVATE_GIG_DB_URL,
});

const gigMigrationsPath = createMigrationsPath({
  domainContext: 'shared',
  framework: 'drizzle',
  finalPathPattern: 'gig_migrations',
  validateExists: true,
});

const privateGigMigrationsPath = createMigrationsPath({
  domainContext: 'shared',
  framework: 'drizzle',
  finalPathPattern: 'private_gig_migrations',
  validateExists: true,
});

// Api config

const globalPrefix = 'auth-api';

const host = process.env.HOST ?? 'localhost';

const port = process.env.PORT ? Number(process.env.PORT) : 3002;

const app = express();

app.use(express.json());

// Routers config

createDrizzleExpressSampleCrudRouter({
  app,
  db: gig_db,
  table: users,
  prefix: `/${globalPrefix}/gig/users`,
});

createDrizzleExpressSampleCrudRouter({
  app,
  db: private_gig_db,
  table: users,
  prefix: `/${globalPrefix}/private-gig/users`,
});

app.get('/' + globalPrefix, (req, res) => {
  res.send({ message: 'Hello Gig-API' });
});

// API startup

Promise.all([
  runMigrations({
    db: gig_db,
    migrationsFolder: gigMigrationsPath,
  }),
  runMigrations({
    db: private_gig_db,
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
