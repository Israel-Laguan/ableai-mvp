import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTable } from 'drizzle-orm/pg-core';

export interface DrizzleBaseRepositoryConfig {
  db: NodePgDatabase;
  schema: PgTable;
}

export interface DrizzleTransactionConfig<
  Repository extends object,
  RepositoryName extends string | number | symbol = string
> {
  db: NodePgDatabase;
  repositoryName: RepositoryName;
  repositoryMaker: (...args: unknown[]) => Repository;
}
