import { sql, type SQL } from 'drizzle-orm';

import { withAlias } from '../../sql';

export function wrap(wrappedSql: SQL, alias?: string): SQL {
  return withAlias(sql`(${wrappedSql})`, alias);
}
