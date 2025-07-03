import { IOmitBase } from '@models/shared';
import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import type { PgColumnBuilderBase } from 'drizzle-orm/pg-core';

export function withBaseSchema<Schema extends object>(
  tableName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Record<keyof Omit<Schema, IOmitBase>, PgColumnBuilderBase<any, object>>
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
