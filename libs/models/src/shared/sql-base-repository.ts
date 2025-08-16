import { IOmitBase, GetAllInput, PaginationResult } from '.';

export type CreateEntityInput<E> = Omit<E, IOmitBase>;
export type UpdateEntityInput<E> = Omit<Partial<E>, IOmitBase>;

export interface ISQLBaseRepository<T extends object> {
  create(input: CreateEntityInput<T>): Promise<T[]>;
  getAll(input?: GetAllInput<T>): Promise<PaginationResult<T>>;
  getById(id: string): Promise<T | null>;
  updateById(id: string, input: UpdateEntityInput<T>): Promise<{ success: boolean }>;
  deleteById(id: string | string[]): Promise<{ success: boolean }>;
}

export type ISQLCustomRepository<
  TSchema extends object,
  RepositoryExtension = object,
  OmittedProperties extends keyof ISQLBaseRepository<TSchema> = never,
  P extends Omit<ISQLBaseRepository<TSchema>, OmittedProperties> & RepositoryExtension = Omit<
    ISQLBaseRepository<TSchema>,
    OmittedProperties
  > &
    RepositoryExtension
> = {
  [K in keyof P]: P[K];
};

export type ISQLRepositoryMaker<
  TDatabase,
  TSchema extends object,
  RepositoryExtension extends object = object,
  OmittedProperties extends keyof ISQLBaseRepository<TSchema> = never
> = ({
  db,
}: {
  db: TDatabase;
}) => ISQLCustomRepository<TSchema, RepositoryExtension, OmittedProperties>;
