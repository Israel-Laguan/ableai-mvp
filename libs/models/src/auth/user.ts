import { IBase } from '../shared/';

export interface PrivateDataUser extends IBase {
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

export interface User extends IBase {
  avatarUrl?: string | null;
  enabled: boolean;
  displayName?: string | null;
  lastAppRole?: string | null;
  lastViewBuyer?: string | null;
  lastViewWorker?: string | null;
  privateDataUserId: number;
  roleId: number;
}

export type UserWithPassword = User & { password: string };
