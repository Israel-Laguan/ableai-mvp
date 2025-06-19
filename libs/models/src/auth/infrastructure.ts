import { IBase, IOmitBase } from '../shared/base';
import { PrivateDataUser, User } from '.';

export type LoginInput = {
  email: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  phoneNumber: string | null;
  password: string;
};

export type UserCreateInput = {
  privateDataUserId: number;
};

export type PrivateDataUserCreateInput = {
  fullName: string;
  email: string;
  phoneNumber: string | null;
};

export type UpdateUserInput = {
  privateDataUser?: Partial<Omit<PrivateDataUser, IOmitBase>>;
  user: Pick<IBase, 'id'> &
    Partial<Omit<User, 'privateDataUserId' | 'roleId' | 'lastAppRole' | IOmitBase>>;
};
