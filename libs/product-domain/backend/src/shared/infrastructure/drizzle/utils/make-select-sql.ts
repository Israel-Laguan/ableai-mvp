import { type SQL, sql } from 'drizzle-orm';
import { DrizzleSQLFactory } from '.';
import { Types } from '..';

export function makeSelectSql<Schema extends object>(schema: Types.DrizzleSchema<Schema>): SQL {
  const selectAllClauses = DrizzleSQLFactory.make.select(schema).columns('*', true);
  return sql`SELECT ${selectAllClauses}`;
}
