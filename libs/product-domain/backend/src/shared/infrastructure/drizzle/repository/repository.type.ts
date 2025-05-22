import { Pool } from 'pg';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type DrizzleDb = NodePgDatabase<Record<string, never>> & {
  $client: Pool;
};
