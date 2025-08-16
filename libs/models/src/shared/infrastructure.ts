import type { SORT, SORTS } from './constants';

export type SortDirection = (typeof SORTS)[number];

export type Sort = `${typeof SORT.ASC}:${string}` | `${typeof SORT.DESC}:${string}`;

export type WhereField<Schema extends object = object> = {
  field: keyof Schema;
  value: Schema[keyof Schema];
};

export type GetAllInput<
  Schema extends object = object,
  WhereFields = { [K in keyof Schema]: { field: K; value: Schema[K] } }
> = {
  select?: (keyof Schema)[];
  sort?: Sort;
  where?: {
    fields?: WhereFields[keyof WhereFields][];
  };
  limit?: number;
  offset?: number;
};

export type PaginationResult<E> = {
  total: number;
  currentPage: number;
  totalPages: number;
  results: E[];
};
