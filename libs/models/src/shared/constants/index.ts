export enum APP_ROLE {
  BUYER = 'BUYER',
  WORKER = 'WORKER',
}

export const SORT = Object.freeze({ ASC: 'ASC', DESC: 'DESC' });

export const SORTS = Object.values(SORT);

export type APP_ROLE_TYPE = (typeof APP_ROLE)[keyof typeof APP_ROLE];
