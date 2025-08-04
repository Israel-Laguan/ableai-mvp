import type { Literal } from './basic-types';
import type { SORT } from './constants';

export type Sort = `${typeof SORT.ASC}:${string}` | `${typeof SORT.DESC}:${string}`;

export type WhereField = {
  field: string;
  value: Literal | Literal[];
};

export type GetAllInput = {
  sort?: Sort;
  where?: {
    fields?: Array<WhereField>;
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
