import { sql, type SQL } from 'drizzle-orm';
import { match, P } from 'ts-pattern';

const spaceTypes = {
  SPACE: 'space',
  LINEBREAK: 'linebreak',
} as const;

const spaces = {
  [spaceTypes.SPACE]: sql.raw(` `),
  [spaceTypes.LINEBREAK]: sql.raw(`\n`),
} as const;

type Options = {
  separator?: SQL;
  spaceBetween?: keyof typeof spaces;
};

export function customParts(clauses: (SQL | null)[], options?: Options): SQL {
  const cls = clauses.filter((clause): clause is SQL => clause !== null);

  const spaceBetween = match(options?.spaceBetween)
    .with(spaceTypes.LINEBREAK, () => {
      return spaces.linebreak;
    })
    .otherwise(() => {
      return spaces.space;
    });

  const separator = match(options?.separator)
    .with(P.nonNullable, separator => separator)
    .otherwise(() => sql.raw(` `));

  return sql.join(cls, sql.join([separator, spaceBetween]));
}

export function parts(...clauses: (SQL | null)[]): SQL {
  return customParts(clauses);
}
