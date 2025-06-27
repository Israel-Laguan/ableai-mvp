export enum APP_ROLE {
  BUYER = 'BUYER',
  WORKER = 'WORKER',
}

export type APP_ROLE_TYPE = (typeof APP_ROLE)[keyof typeof APP_ROLE];
