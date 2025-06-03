import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTable } from 'drizzle-orm/pg-core';

export interface BaseRepositoryConfig {
  db: NodePgDatabase;
  schema: PgTable;
}

export interface TransactionBaseConfig<
  Repository extends object,
  RepositoryName extends string | number | symbol = string
> {
  db: NodePgDatabase;
  repositoryName: RepositoryName;
  repositoryMaker: (...args: unknown[]) => Repository;
}
