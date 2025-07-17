import { sql } from 'drizzle-orm';

export function makeSQLArray<T extends string | number>(array: T[], pgType: 'text' | 'int') {
  return sql`ARRAY[${sql.join(array, sql`, `)}]::${sql.raw(pgType + '[]')}`;
}
