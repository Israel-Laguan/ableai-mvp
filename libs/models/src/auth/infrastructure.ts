import type { IBase, IOmitBase, UpdateEntityInput } from '../shared';
import type { Buyer, PrivateDataUser, User, Worker } from '.';

export type LoginInput = Pick<User, 'id'>;

export type RegisterInput = Omit<PrivateDataUser, IOmitBase> & {
  email: string;
  password: string;
};

export type UserCreateInput = Pick<User, 'uid' | 'privateDataUserId' | 'roleId'>;

export type PrivateDataUserCreateInput = Omit<PrivateDataUser, IOmitBase>;

export type UpdateBuyerInput = UpdateEntityInput<Omit<Buyer, 'userId'>>;

export type UpdatePrivateDataInput = UpdateEntityInput<PrivateDataUser>;

export type IUpdateUserInput = Pick<IBase, 'id'> &
  UpdateEntityInput<Omit<User, 'privateDataUserId' | 'roleId' | 'uid'>>;

export type UpdateWorkerInput = UpdateEntityInput<Omit<Worker, 'userId'>>;

export type UpdateUserInput = {
  privateDataUser?: UpdatePrivateDataInput;
  user: IUpdateUserInput;
  buyer: UpdateBuyerInput;
  worker: UpdateWorkerInput;
};
