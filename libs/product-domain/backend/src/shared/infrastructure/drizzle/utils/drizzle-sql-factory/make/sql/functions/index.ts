import { sql, type SQL } from 'drizzle-orm';

import { withAlias } from '../utils';

export * as jsonBuildObject from './json-build-object';

export function arrayAgg(wrappedSql: SQL, alias?: string): SQL {
  return withAlias(sql`ARRAY_AGG(${wrappedSql})`, alias);
}

export function coalesce(wrappedSql: SQL, defaultValue: SQL, alias?: string): SQL {
  return withAlias(sql`COALESCE(${wrappedSql}, ${defaultValue})`, alias);
}

export function rowToJSON(wrappedSql: SQL, alias?: string): SQL {
  return withAlias(sql`row_to_json(${wrappedSql})`, alias);
}

export function sum(wrappedSql: SQL, alias?: string): SQL {
  return withAlias(sql`SUM(${wrappedSql})`, alias);
}
