// # Libs
import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';

// # Modules
import gigDbConfig from './config/gig.drizzle.config';
import privateGigDbConfig from './config/private_gig.drizzle.config';
import { users } from './schema';

import { createPool } from '@vercel/postgres';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
interface DrizzleVercelDbConnection {
  connectionString: string;
}

function createDrizzleVercelDbConnection(config: DrizzleVercelDbConnection) {
  const { connectionString } = config;

  const client = createPool({
    connectionString,
  });

  return drizzleVercel(client);
}

const gig_db = createDrizzleVercelDbConnection({
  connectionString: gigDbConfig.dbCredentials.url,
});

const private_gig_db = createDrizzleVercelDbConnection({
  connectionString: privateGigDbConfig.dbCredentials.url,
});

type DbConnection =
  | ReturnType<typeof drizzle>
  | ReturnType<typeof drizzleVercel>;

async function runMigrations({
  db,
  migrationsFolder,
}: {
  db: DbConnection;
  migrationsFolder: string;
}) {
  try {
    await migrate(db, {
      migrationsFolder,
    });
    console.log('Migrations ran successfully');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

const host = process.env.HOST ?? 'localhost';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

app.use(express.json());

function setupCrudRouter<T extends { id: number }>({
  db,
  table,
  prefix,
}: {
  db: DbConnection;
  table: PgTableWithColumns<any>;
  prefix: string;
}) {
  const router = express.Router();

  const devErrLog = ({ action, err }: { action: string; err: Error }) => {
    if (process.env.NODE_ENV === 'development')
      console.warn(`[DEV] Error ${action} item: `, { err });
  };

  // GET all
  router.get('/', async (req, res) => {
    try {
      const items = await db.select().from(table);

      res.json(items);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching items' });
    }
  });

  // GET by id
  router.get('/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);

      const item = await db.select().from(table).where(eq(table.id, id));

      if (!item) return res.status(404).json({ error: 'Not found' });

      res.json(item);
    } catch (err) {
      devErrLog({ action: 'fetching', err });

      res.status(500).json({ error: 'Error fetching item' });
    }
  });

  // CREATE
  router.post('/', async (req, res) => {
    try {
      const created = await db.insert(table).values(req.body).returning();

      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: 'Error creating item' });
    }
  });

  // UPDATE
  router.put('/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);

      const updated = await db
        .update(table)
        .set(req.body)
        .where(eq(table.id, id))
        .returning();

      if (!updated) return res.status(404).json({ error: 'Not found' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Error updating item' });
    }
  });

  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);

      const deleted = await db
        .delete(table)
        .where(eq(table.id, id))
        .returning();

      if (!deleted) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Error deleting item' });
    }
  });

  app.use(prefix, router);
}

// Routers configs
const globalPrefix = process.env.GLOBAL_PREFIX ?? 'gig-api';

const gigUsersPrefix = process.env.GIG_USERS_PREFIX ?? 'gig/users';

const privateGigUsersPrefix =
  process.env.PRIVATE_GIG_USERS_PREFIX ?? 'private-gig/users';

setupCrudRouter({
  db: gig_db,
  table: users,
  prefix: '/' + globalPrefix + '/' + gigUsersPrefix,
});

setupCrudRouter({
  db: private_gig_db,
  table: users,
  prefix: '/' + globalPrefix + '/' + privateGigUsersPrefix,
});

app.get('/' + globalPrefix, (req, res) => {
  res.send({ message: 'Hello Gig-API' });
});

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
