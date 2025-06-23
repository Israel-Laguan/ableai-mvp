import { IBase, IOmitBase } from '../shared/base';
import { PrivateDataUser, User } from '.';

export type LoginInput = Pick<User, 'id'>;

export type RegisterInput = Omit<PrivateDataUser, IOmitBase> & {
  email: string;
  password: string;
};

export type UserCreateInput = Pick<User, 'uid' | 'privateDataUserId'>;

export type PrivateDataUserCreateInput = Omit<PrivateDataUser, IOmitBase>;

export type UpdateUserInput = {
  privateDataUser?: Partial<Omit<PrivateDataUser, IOmitBase>>;
  user: Pick<IBase, 'id'> &
    Partial<Omit<User, 'privateDataUserId' | 'roleId' | 'lastAppRole' | IOmitBase>>;
};
