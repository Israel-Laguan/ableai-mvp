// import { PgTable, TableConfig } from 'drizzle-orm/pg-core';
// import { NodePgDatabase } from 'drizzle-orm/node-postgres';
// import {
//   eq,
//   and,
//   SQL,
//   desc,
//   asc,
//   count,
//   inArray,
//   InferInsertModel,
//   InferSelectModel,
// } from 'drizzle-orm';

// import { Shared } from '@product-domain/backend';
// import { GetAllInput, PaginationResult } from '@models/shared';

// export const makeDrizzleBaseRepository = <TSchema extends PgTable<TableConfig>>(
//   em: NodePgDatabase<Record<string, TSchema>>,
//   schema: TSchema
// ): Shared.Domain.ISQLBaseRepository<TSchema> => {
//   type TInsertModel = InferInsertModel<TSchema>;
//   type TSelectModel = InferSelectModel<TSchema>;

//   return {
//     create: async (input: Shared.Domain.CreateEntityInput<TSchema>): Promise<TSelectModel[]> => {
//       // Drizzle espera el modelo de inserción, pero la interfaz pública debe cumplir el contrato CreateEntityInput<TSchema>
//       // Normalmente los campos coinciden, pero si hay diferencias, aquí se puede adaptar el input
//       const result = await em
//         .insert(schema)
//         .values(input as TInsertModel)
//         .returning();
//       return result as TSelectModel[];
//     },
//     getAll: async (input?: GetAllInput): Promise<PaginationResult<TSelectModel>> => {
//       let query = em.select().from(schema);
//       const conditions: SQL[] = [];

//       if (input?.where?.fields && input.where.fields.length > 0) {
//         for (const { field, value } of input.where.fields) {
//           const column = (schema as any)[field];
//           if (column) {
//             if (Array.isArray(value)) {
//               conditions.push(inArray(column, value));
//             } else {
//               conditions.push(eq(column, value));
//             }
//           } else {
//             console.warn(`The Column '${field}' is not found in the table.`);
//           }
//         }
//         if (conditions.length > 0) {
//           query = query.where(and(...conditions));
//         }
//       }

//       const countQuery = em.select({ count: count() }).from(schema);
//       if (conditions.length > 0) {
//         countQuery.where(and(...conditions));
//       }
//       const totalResult = await countQuery;
//       const total = totalResult[0]?.count ?? 0; // Obtener el conteo, por defecto 0 si no hay resultados

//       if (input?.sort && input.sort.split(':').length === 2) {
//         const sortField = input.sort.split(':')[1];
//         const column = schema[sortField];
//         if (column) {
//           if (input.sort[0] === 'desc') {
//             query = query.orderBy(desc(column));
//           } else {
//             query = query.orderBy(asc(column));
//           }
//         } else {
//           console.warn(`The sort column '${sortField}' is not found in the table.`);
//         }
//       }

//       const LIMIT_DEFAULT = 10;
//       const limit = input?.limit && input.limit > 0 ? input.limit : LIMIT_DEFAULT;

//       const OFFSET_DEFAULT = 0;
//       const offset = input?.offset && input.offset >= 0 ? input.offset : OFFSET_DEFAULT;

//       query = query.limit(limit);
//       query = query.offset(offset);

//       const results = await query;

//       const totalPages = Math.ceil(total / limit);
//       const currentPage = Math.floor(offset / limit) + 1;

//       return {
//         total,
//         currentPage,
//         totalPages,
//         results,
//       };
//     },
//     getById: async (id: string) => {
//       const result = await em
//         .select()
//         .from(schema)
//         .where(eq((schema as any).id, id));
//       return result[0] || null;
//     },
//     updateById: async (id: string, entity: Partial<T>) => {
//       const result = await em.update(schema).set(entity).where(eq(schema.id, id)).returning();

//       return { success: result.length > 0 };
//     },
//     deleteById: async (id: string | string[]) => {
//       const ids = Array.isArray(id) ? id : [id];
//       const result = await em.delete(schema).where(inArray(schema.id, ids)).returning();

//       return { success: result.length > 0 };
//     },
//   };
// };
