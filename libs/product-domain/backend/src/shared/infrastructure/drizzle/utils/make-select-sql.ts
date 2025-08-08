import { sql, type SQL } from 'drizzle-orm';

import type { Types } from '..';

function makeSelectAllClauseArgs<Schema extends object>(schema: Types.DrizzleSchema<Schema>): SQL {
  const clauses = schema._customs.data.columnKeys.map(key => {
    const column = schema[key];
    const alias = schema._customs.data.column[key].key as string;
    return sql`${column} AS ${sql.raw(`"${alias}"`)}`;
  });
  return sql`${sql.join(clauses, sql`, `)}`;
}

export function makeSelectSql<Schema extends object>(schema: Types.DrizzleSchema<Schema>): SQL {
  const selectAllClauses = makeSelectAllClauseArgs(schema);
  return sql`SELECT ${selectAllClauses}`;
}
