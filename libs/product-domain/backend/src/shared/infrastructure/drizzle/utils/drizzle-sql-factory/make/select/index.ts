import { type SQL, sql } from 'drizzle-orm';
import { match, P } from 'ts-pattern';

import type { Types } from '../../../..';

import { Errors } from '@shared';
import { withAlias, args } from '../sql';

const PATH = 'DRIZZLE_SQL_FACTORY_SELECT';

function column<Schema extends object>({
  columnKey,
  columnAlias,
  schema,
  schemaAlias,
}: Types.MakeColumnInput<Schema>): SQL {
  if (!schema._customs.data.columnKeys.includes(columnKey)) {
    throw Errors.InternalServerError.create(`Invalid column key: ${String(columnKey)}`, PATH);
  }

  const column = schema[columnKey];

  return withAlias(
    match(schemaAlias)
      .with(P.string, schemaAlias => {
        return sql.raw(`${schemaAlias}.${column.name}`);
      })
      .otherwise(() => {
        return sql`${column}`;
      }),

    columnAlias
  );
}

function makeColumns<Schema extends object>({
  columns,
  schema,
  schemaAlias,
  useDefaultAlias,
}: Types.MakeColumnsInput<Schema>): SQL {
  return args(
    ...columns.map(columnKey => {
      const columnAlias = match(useDefaultAlias)
        .with(true, () => {
          return String(columnKey);
        })
        .otherwise(() => undefined);

      return column({ schema, columnKey, schemaAlias, columnAlias });
    })
  );
}

function columns<Schema extends object>({
  columns,
  schema,
  schemaAlias,
  useDefaultAlias = false,
}: Types.MakeColumnsWithColumnOptionsInput<Schema>): SQL {
  const mkClm = (columns: string[]) =>
    makeColumns({
      columns: columns as Types.ColumnKey<Schema>[],
      schema,
      schemaAlias,
      useDefaultAlias,
    });

  return match(columns)
    .with('*', () => {
      return mkClm(schema._customs.data.columnKeys as string[]);
    })

    .with(P.array(P.string), columns => {
      return mkClm(columns);
    })

    .exhaustive();
}

export function select<Schema extends object>(schema: Types.DrizzleSchema<Schema>, alias?: string) {
  const schemaAlias = match(alias)
    .with(P.string, alias => alias)
    .otherwise(() => undefined);

  return {
    column<T extends Types.ColumnKey<Schema>>(columnKey: T, alias?: string): SQL {
      return column({ columnKey, schema, schemaAlias, columnAlias: alias });
    },

    columns<T extends Types.ColumnKey<Schema>[] | '*'>(
      columnsKeys: T,
      useDefaultAlias?: boolean
    ): SQL {
      return columns({ schema, columns: columnsKeys as string[], schemaAlias, useDefaultAlias });
    },

    columnKeys: () => schema._customs.data.columnKeys,
  };
}
