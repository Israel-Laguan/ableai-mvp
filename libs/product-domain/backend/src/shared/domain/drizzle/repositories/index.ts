import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTable } from 'drizzle-orm/pg-core';

export interface BaseRepositoryConfig<
  Repository extends object,
  RepositoryName extends string | number | symbol = string
> {
  db: NodePgDatabase;
  schema: PgTable;
  repositoryName: RepositoryName;
  repositoryMaker: (...args: unknown[]) => Repository;
}
