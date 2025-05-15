// # Libs
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

// # Modules
import gigDbConfig from './config/gig.drizzle.config';
import privateGigDbConfig from './config/private_gig.drizzle.config';
import { users } from './schema';

import { Drizzle } from '@backend';

dotenv.config();

// Db connection config

const {
  Utils: { createDrizzleExpressSampleCrudRouter, createDrizzleVercelDbConnection, runMigrations },
} = Drizzle;

const gig_db = createDrizzleVercelDbConnection({
  connectionString: gigDbConfig.dbCredentials.url,
});

const private_gig_db = createDrizzleVercelDbConnection({
  connectionString: privateGigDbConfig.dbCredentials.url,
});

// Api config

const globalPrefix = 'gig-api';

const host = process.env.HOST ?? 'localhost';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

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
    migrationsFolder: path.join(__dirname, './gig_migrations'),
  }),
  runMigrations({
    db: private_gig_db,
    migrationsFolder: path.join(__dirname, './private_gig_migrations'),
  }),
])
  .catch((err) => {
    console.error('Error during startup:', err);
    process.exit(1);
  })
  .then(() => {
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}/${globalPrefix}`);
    });
  });
