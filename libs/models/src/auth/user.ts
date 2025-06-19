import { IBase } from '../shared/';

export interface PrivateDataUser extends IBase {
  phoneNumber: string | null;
}

export enum LAST_APP_ROLE {
  BUYER = 'BUYER',
  WORKER = 'WORKER',
}

export type LAST_APP_ROLE_TYPE = (typeof LAST_APP_ROLE)[keyof typeof LAST_APP_ROLE];

export interface User extends IBase {
  uid: string;
  lastAppRole?: LAST_APP_ROLE_TYPE | null;
  privateDataUserId: number;
  roleId: number;
}

export type UserClaims = Pick<User, 'id' | 'lastAppRole' | 'roleId'>;
