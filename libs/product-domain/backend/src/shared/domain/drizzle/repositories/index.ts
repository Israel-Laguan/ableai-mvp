import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTable } from 'drizzle-orm/pg-core';

import { ISQLRepositoryMaker, SafeAny } from '@models/shared';

export interface BaseRepositoryConfig {
  db: NodePgDatabase;
  schema: PgTable;
  repositoryName: string;
  repositoryMaker: ISQLRepositoryMaker<NodePgDatabase, SafeAny, SafeAny>;
}
