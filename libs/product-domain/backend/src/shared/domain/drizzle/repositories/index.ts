import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTable } from 'drizzle-orm/pg-core';

export interface BaseRepositoryConfig<Repository = unknown> {
  db: NodePgDatabase;
  schema: PgTable;
  repositoryName: string;
  repositoryMaker: (...args: unknown[]) => Repository;
}
