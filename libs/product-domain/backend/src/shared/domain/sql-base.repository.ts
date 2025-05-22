/* eslint-disable no-unused-vars */
import {
  IOmitBase,
  // GetAllInput,
  // PaginationResult
} from '@models/shared';

export type CreateEntityInput<E> = Omit<E, IOmitBase>;
export type UpdateEntityInput<E> = Omit<Partial<E>, IOmitBase>;

// TODO: Repair Lint for Types
export interface ISQLBaseRepository<T> {
  create(input: CreateEntityInput<T>): Promise<T[]>;
  // getAll<T>(input?: GetAllInput): Promise<PaginationResult<T>>;
  // getById(id: string): Promise<T | null>;
  // updateById(id: string, input: UpdateEntityInput<T>): Promise<{ success: boolean }>;
  // deleteById(id: string | string[]): Promise<{ success: boolean }>;
}
