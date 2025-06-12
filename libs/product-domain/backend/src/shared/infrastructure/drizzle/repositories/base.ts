import { PgColumn } from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, SQL, desc, asc, count, inArray } from 'drizzle-orm';

import type {
  CreateEntityInput,
  GetAllInput,
  ISQLBaseRepository,
  PaginationResult,
  UpdateEntityInput,
} from '@models/shared';
import type { DrizzleBaseRepositoryConfig } from '../../../domain/interfaces';

export const makeDrizzleBaseRepositoryWithSettlesEm = <TSchema>({
  schema,
}: Pick<DrizzleBaseRepositoryConfig, 'schema'>): (({
  db,
}: Pick<DrizzleBaseRepositoryConfig, 'db'>) => ISQLBaseRepository<TSchema>) => {
  const repository = {
    create: async function (
      db: NodePgDatabase,
      input: CreateEntityInput<TSchema>
    ): Promise<TSchema[]> {
      const result = await db.insert(schema).values(input).returning();

      return result as TSchema[];
    },

    getAll: async (db: NodePgDatabase, input?: GetAllInput): Promise<PaginationResult<TSchema>> => {
      const query = db.select().from(schema);
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

      const countQuery = db.select({ count: count() }).from(schema);

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

    getById: async (db: NodePgDatabase, id: string): Promise<TSchema | null> => {
      const result = await db
        .select()
        .from(schema)
        .where(eq((schema as unknown as Record<string, PgColumn>)['id'], id));
      return (result[0] as TSchema) || null;
    },

    updateById: async (db: NodePgDatabase, id: string, entity: UpdateEntityInput<TSchema>) => {
      const result = await db
        .update(schema)
        .set(entity)
        .where(eq((schema as unknown as Record<string, PgColumn>)['id'], id))
        .returning();

      return { success: result.length > 0 };
    },

    deleteById: async (db: NodePgDatabase, id: string | string[]) => {
      const ids = Array.isArray(id) ? id : [id];

      const result = await db
        .delete(schema)
        .where(inArray((schema as unknown as Record<string, PgColumn>)['id'], ids))
        .returning();
      return { success: result.length > 0 };
    },
  };

  return ({ db }): ISQLBaseRepository<TSchema> => {
    return {
      create: async function (input: CreateEntityInput<TSchema>): Promise<TSchema[]> {
        return await repository.create(db, input);
      },
      getAll: async function (input?: GetAllInput): Promise<PaginationResult<TSchema>> {
        return await repository.getAll(db, input);
      },
      getById: async function (id: string): Promise<TSchema | null> {
        return await repository.getById(db, id);
      },
      updateById: async function (
        id: string,
        input: UpdateEntityInput<TSchema>
      ): Promise<{ success: boolean }> {
        return await repository.updateById(db, id, input);
      },
      deleteById: async function (id: string | string[]): Promise<{ success: boolean }> {
        return await repository.deleteById(db, id);
      },
    };
  };
};

export const makeDrizzleBaseRepository = <TSchema>({
  db,
  schema,
}: DrizzleBaseRepositoryConfig): ISQLBaseRepository<TSchema> => {
  return makeDrizzleBaseRepositoryWithSettlesEm<TSchema>({ schema })({
    db: db,
  });
};
