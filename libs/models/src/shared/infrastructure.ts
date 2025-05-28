import { Literal } from './basic-types';

export type WhereField = {
  field: string;
  value: Literal | Literal[];
};

export type GetAllInput = {
  sort?: string;
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
