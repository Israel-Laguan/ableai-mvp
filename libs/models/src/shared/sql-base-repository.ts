import { IOmitBase, GetAllInput, PaginationResult, SafeAny } from '.';

export type CreateEntityInput<E> = Omit<E, IOmitBase>;
export type UpdateEntityInput<E> = Omit<Partial<E>, IOmitBase>;

export interface ISQLBaseRepository<T> {
  create(input: CreateEntityInput<T>): Promise<T[]>;
  getAll(input?: GetAllInput): Promise<PaginationResult<T>>;
  getById(id: string): Promise<T | null>;
  updateById(id: string, input: UpdateEntityInput<T>): Promise<{ success: boolean }>;
  deleteById(id: string | string[]): Promise<{ success: boolean }>;
}

export type ISQLCustomRepository<
  TSchema,
  RepositoryExtension = SafeAny,
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
  TSchema,
  RepositoryExtension extends SafeAny = SafeAny,
  OmittedProperties extends keyof ISQLBaseRepository<TSchema> = never
> = ({
  db,
}: {
  db: TDatabase;
}) => ISQLCustomRepository<TSchema, RepositoryExtension, OmittedProperties>;
