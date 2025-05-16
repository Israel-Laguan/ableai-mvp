import { eq } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import * as express from 'express';

type DbConnection = ReturnType<typeof drizzleVercel> | ReturnType<typeof drizzle>;

const devErrLog = ({ action, err }: { action: string; err: unknown }) => {
  if (process.env['NODE_ENV'] === 'development')
    console.warn(`[DEV] Error ${action} item: `, {
      err: err instanceof Error ? err : new Error(String(err)),
    });
};

export function createDrizzleExpressSampleCrudRouter({
  app,
  db,
  prefix,
  table,
}: {
  app: express.Express;
  db: DbConnection;
  table: PgTableWithColumns<any>;
  prefix: string;
}) {
  const router = express.Router();

  // GET all
  router.get('/', async (req, res) => {
    try {
      const items = await db.select().from(table);

      return res.json(items);
    } catch (err) {
      devErrLog({ action: 'fetching', err });

      return res.status(500).json({ error: 'Error fetching items' });
    }
  });

  // GET by id
  router.get('/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);

      const item = await db.select().from(table).where(eq(table['id'], id));

      if (!item) return res.status(404).json({ error: 'Not found' });

      return res.json(item);
    } catch (err) {
      devErrLog({ action: 'fetching', err });

      return res.status(500).json({ error: 'Error fetching item' });
    }
  });

  // CREATE
  router.post('/', async (req, res) => {
    try {
      const created = await db.insert(table).values(req.body).returning();

      return res.status(201).json(created);
    } catch (err) {
      devErrLog({ action: 'creating', err });

      return res.status(500).json({ error: 'Error creating item' });
    }
  });

  // UPDATE
  router.put('/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);

      const updated = await db.update(table).set(req.body).where(eq(table['id'], id)).returning();

      if (!updated) return res.status(404).json({ error: 'Not found' });

      return res.json(updated);
    } catch (err) {
      devErrLog({ action: 'updating', err });

      return res.status(500).json({ error: 'Error updating item' });
    }
  });

  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);

      const deleted = await db.delete(table).where(eq(table['id'], id)).returning();

      if (!deleted) return res.status(404).json({ error: 'Not found' });

      return res.status(204).send();
    } catch (err) {
      devErrLog({ action: 'deleting', err });

      return res.status(500).json({ error: 'Error deleting item' });
    }
  });

  app.use(prefix, router);
}
