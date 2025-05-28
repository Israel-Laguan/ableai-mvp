import { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, SQL, desc, asc, count, inArray } from 'drizzle-orm';

import {
  CreateEntityInput,
  GetAllInput,
  ISQLBaseRepository,
  PaginationResult,
  UpdateEntityInput,
} from '@models/shared';

interface Config {
  em: NodePgDatabase;
  schema: PgTable;
}

export const makeDrizzleBaseRepository = <TSchema>({
  em,
  schema,
}: Config): ISQLBaseRepository<TSchema> => {
  return {
    create: async function (input: CreateEntityInput<TSchema>): Promise<TSchema[]> {
      const result = await em.insert(schema).values(input).returning();

      return result as TSchema[];
    },

    getAll: async (input?: GetAllInput): Promise<PaginationResult<TSchema>> => {
      const query = em.select().from(schema);
      const conditions: SQL[] = [];

      if (input?.where?.fields && input.where.fields.length > 0) {
        for (const { field, value } of input.where.fields) {
          const column = (schema as unknown as Record<string, PgColumn>)[field];

          if (column) {
            if (Array.isArray(value)) {
              conditions.push(inArray(column, value));
            } else {
              conditions.push(eq(column, value));
            }
          } else {
            console.warn(`The Column '${field}' is not found in the table.`);
          }
        }

        if (conditions.length > 0) {
          query.where(and(...conditions));
        }
      }

      const countQuery = em.select({ count: count() }).from(schema);

      if (conditions.length > 0) {
        countQuery.where(and(...conditions));
      }

      const totalResult = await countQuery;
      const total = totalResult[0]?.count ?? 0;

      const sort = input?.sort?.split(':') || [];

      if (sort.length === 2) {
        const sortField = sort[1];

        const column = (schema as unknown as Record<string, PgColumn>)[sortField];

        if (column) {
          if (sort[0] === 'desc') {
            query.orderBy(desc(column));
          } else {
            query.orderBy(asc(column));
          }
        } else {
          console.warn(`The sort column '${sortField}' is not found in the table.`);
        }
      }

      const LIMIT_DEFAULT = 10;
      const limit = input?.limit && input.limit > 0 ? input.limit : LIMIT_DEFAULT;

      const OFFSET_DEFAULT = 0;
      const offset = input?.offset && input.offset >= 0 ? input.offset : OFFSET_DEFAULT;

      query.limit(limit);
      query.offset(offset);

      const results = await query.execute();

      const totalPages = Math.ceil(total / limit);
      const currentPage = Math.floor(offset / limit) + 1;

      return {
        total,
        currentPage,
        totalPages,
        results: results as TSchema[],
      };
    },

    getById: async (id: string): Promise<TSchema | null> => {
      const result = await em
        .select()
        .from(schema)
        .where(eq((schema as unknown as Record<string, PgColumn>)['id'], id));
      return (result[0] as TSchema) || null;
    },

    updateById: async (id: string, entity: UpdateEntityInput<TSchema>) => {
      const result = await em
        .update(schema)
        .set(entity)
        .where(eq((schema as unknown as Record<string, PgColumn>)['id'], id))
        .returning();

      return { success: result.length > 0 };
    },
    deleteById: async (id: string | string[]) => {
      const ids = Array.isArray(id) ? id : [id];

      const result = await em
        .delete(schema)
        .where(inArray((schema as unknown as Record<string, PgColumn>)['id'], ids))
        .returning();
      return { success: result.length > 0 };
    },
  };
};
