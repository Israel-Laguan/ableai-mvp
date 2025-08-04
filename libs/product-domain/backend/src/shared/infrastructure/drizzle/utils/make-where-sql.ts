import { sql, SQL } from 'drizzle-orm';

import { blankSql } from '../constants';

export function makeWhereSql(whereClauses: SQL[]): SQL {
  return whereClauses.filter(v => v !== blankSql).length > 0
    ? sql`WHERE ${sql.join(whereClauses, sql` AND `)}`
    : blankSql;
}
