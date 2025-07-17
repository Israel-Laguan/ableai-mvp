import type { SQL } from 'drizzle-orm';

import { blankSql } from '../constants';

export function isNotBlankSQL<T>(sql: SQL<T>) {
  return sql !== blankSql;
}
