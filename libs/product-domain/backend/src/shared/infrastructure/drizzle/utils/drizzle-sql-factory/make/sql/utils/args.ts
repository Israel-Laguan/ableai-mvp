import { sql, type SQL } from 'drizzle-orm';
import { customParts } from './parts';

export function args(...clauses: (SQL | null)[]): SQL {
  return customParts(clauses, { spaceBetween: 'linebreak', separator: sql`, ` });
}
