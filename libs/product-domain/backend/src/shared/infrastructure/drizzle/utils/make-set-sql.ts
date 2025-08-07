import { type SQL, sql } from 'drizzle-orm';

export function makeSetSql(setClauses: SQL[]) {
  return sql`SET ${sql.join(setClauses, sql`, `)}`;
}
