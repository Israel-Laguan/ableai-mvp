import type { IOmitBase } from '@models/shared';
import type { PgColumnBuilderBase } from 'drizzle-orm/pg-core';

import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { Types } from '..';

export function withBaseSchema<Schema extends object>(
  tableName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Record<keyof Omit<Schema, IOmitBase>, PgColumnBuilderBase<any, object>>
) {
  const tableColumns = {
    ...columns,
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  };

  const pgTableInstance = pgTable(tableName, tableColumns);

  type ColumnKey = keyof typeof tableColumns;

  type CustomData = Types.DrizzleSchemaCustomData<ColumnKey>;

  const columnKeys = Object.keys(tableColumns) as CustomData['columnKeys'];

  const makeValue = <K extends ColumnKey>(key: K): CustomData['columns'][K] => {
    return {
      key,
      name: pgTableInstance[key].name,
    };
  };

  const columnEntries = columnKeys.map(key => {
    const value = makeValue(key);
    return [key, value] as const;
  });

  const columnObjFromEntries = Object.fromEntries(columnEntries);

  const columnRecord = Object.freeze(columnObjFromEntries) as CustomData['columns'];

  const _customs = {
    data: {
      columnKeys,
      columns: columnRecord,
      isSchema: true,
      tableName,
    } satisfies Types.DrizzleSchemaCustomData<ColumnKey>,
  };

  Object.defineProperty(pgTableInstance, '_customs', {
    value: _customs,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  return pgTableInstance as typeof pgTableInstance & {
    _customs: typeof _customs;
  };
}
