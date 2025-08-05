import type { IOmitBase } from '@models/shared';
import type { PgColumnBuilderBase } from 'drizzle-orm/pg-core';

import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export function withBaseSchema<Schema extends object>(
  tableName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Record<keyof Omit<Schema, IOmitBase>, PgColumnBuilderBase<any, object>>
) {
  const tableColumns = {
    ...columns,
    id: serial('id').primaryKey(),
    ...columns,
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  };

  const pgTableInstance = pgTable(tableName, tableColumns);

  type ColumnKey = keyof typeof tableColumns;

  const columnKeys = Object.keys(tableColumns) as ColumnKey[];

  type Column = {
    [K in ColumnKey]: {
      key: K;
    };
  };

  const columnEntries = columnKeys.map((key: ColumnKey) => {
    const value = {
      key,
    };
    return [key, value] as const;
  });

  const columnObjFromEntries = Object.fromEntries(columnEntries) as Column;

  const column = Object.freeze(columnObjFromEntries);

  Object.defineProperty(pgTableInstance, '_customs', {
    value: {
      data: {
        columnKeys,
        column,
      },
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });

  return pgTableInstance as typeof pgTableInstance & {
    _customs: { data: { columnKeys: ColumnKey[]; column: Column } };
  };
}
