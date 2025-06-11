import { IBase } from '../shared/';

export interface PrivateDataUser extends IBase {
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

export enum LAST_APP_ROLE {
  BUYER = 'BUYER',
  WORKER = 'WORKER',
}

export type LAST_APP_ROLE_TYPE = (typeof LAST_APP_ROLE)[keyof typeof LAST_APP_ROLE];

export interface User extends IBase {
  avatarUrl?: string | null;
  displayName?: string | null;
  lastAppRole?: LAST_APP_ROLE_TYPE | null;
  lastViewBuyer?: string | null;
  lastViewWorker?: string | null;
  loginAttempts?: number;
  blockId?: string | null;
  privateDataUserId: number;
  roleId: number;
}
