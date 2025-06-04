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

export enum ENABLE {
  DISABLED_PERM = 'DISABLED_PERM',
  ENABLE = 'ENABLE',
  NOT_VERIFIED = 'NOT_VERIFIED',
  TO_MANY_ATTEMPTS = 'TO_MANY_ATTEMPTS',
}

export type ENABLE_TYPE = (typeof ENABLE)[keyof typeof ENABLE];

export type LAST_APP_ROLE_TYPE = (typeof LAST_APP_ROLE)[keyof typeof LAST_APP_ROLE];

export interface User extends IBase {
  avatarUrl?: string | null;
  enabled: ENABLE_TYPE;
  displayName?: string | null;
  lastAppRole?: LAST_APP_ROLE_TYPE;
  lastViewBuyer?: string | null;
  lastViewWorker?: string | null;
  privateDataUserId: number;
  roleId: number;
}

export type UserWithPassword = User & { password: string };
