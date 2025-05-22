import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import type { PgColumnBuilderBase } from 'drizzle-orm/pg-core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ColumnBuilders = Record<string, PgColumnBuilderBase<any>>;

export function withBaseSchema<TColumns extends ColumnBuilders>(
  tableName: string,
  columns: TColumns
) {
  return pgTable(tableName, {
    id: serial('id').primaryKey(),
    ...columns,
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  });
}
