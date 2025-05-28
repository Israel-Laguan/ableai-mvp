import { IBase } from '../shared/';

export interface PrivateDataUser extends IBase {
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

export interface User extends IBase {
  enabled: boolean;
  roleId: number;
  privateDataUserId: number;
}

export type UserWithPassword = User & { password: string };
