import { sql, type SQL } from 'drizzle-orm';

import type { Types } from '../../../../..';

import { select } from '../../select';
import { args, withAlias } from '../utils';

function selectOne(key: string, value: SQL): SQL {
  return args(sql.raw(`'${key}'`), value);
}

function selectMany<Schema extends object>(
  table: ReturnType<typeof select<Schema>>,
  columns: Types.ColumnKey<Schema>[]
): SQL {
  return args(
    ...columns.map(columnKey => {
      const value = table.column(columnKey);
      return selectOne(String(columnKey), value);
    })
  );
}

export function makeJSONBuildObjectSchema<Schema extends object>(
  schema: Types.DrizzleSchema<Schema>,
  alias?: string
) {
  const table = select(schema, alias);
  return {
    selectAll() {
      return selectMany(table, table.columnKeys());
    },

    select(...columns: Types.ColumnKey<Schema>[]) {
      return selectMany(table, columns);
    },
  };
}

export function JSONBuildObject(wrappedSql: SQL, alias?: string): SQL {
  return withAlias(sql`json_build_object(${wrappedSql})`, alias);
}
