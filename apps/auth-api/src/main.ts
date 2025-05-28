import express from 'express';

import { Shared as SharedDomainBackend } from '@product-domain/backend';
import { Gig, PrivateGig } from './db';
import router, { globalPrefix } from './routes';

const { gigMigrationsPath, gigDb } = Gig;
const { privateGigMigrationsPath, privateGigDb } = PrivateGig;

const {
  Infra: {
    Drizzle: {
      Utils: { runMigrations },
    },
  },
} = SharedDomainBackend;

// Api config

const host = process.env.HOST ?? 'localhost';

const port = process.env.PORT ? Number(process.env.PORT) : 3002;

const app = express();

app.use(express.json());

// Routers config

app.use(router);

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
