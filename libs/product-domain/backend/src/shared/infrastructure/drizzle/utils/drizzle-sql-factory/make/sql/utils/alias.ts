import { sql, type SQL } from 'drizzle-orm';
import { match, P } from 'ts-pattern';

import { customParts } from './parts';

export function alias(alias: string): SQL {
  return sql.raw(`"${alias}"`);
}

export function withAlias(clause: SQL, alias?: string): SQL {
  return customParts([
    clause,

    match(alias)
      .with(P.string, alias => {
        return sql` AS ${sql.raw(`"${alias}"`)}`;
      })
      .otherwise(() => null),
  ]);
}
