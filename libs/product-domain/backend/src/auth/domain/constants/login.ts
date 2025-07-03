export enum LOGIN_STATUS_CODE {
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export type LoginStatusKeys = keyof typeof LOGIN_STATUS_CODE;
