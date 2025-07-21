import type { User, Infra } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

type OmitBase = 'create';

export type FindUserIdsByPrivateDataUserIds = (privateDataUserIds: number[]) => Promise<number[]>;

interface CustomMethods {
  create: (userInput: Infra.UserCreateInput) => Promise<User[]>;
  getByPrivateDataUserId: (id: number) => Promise<User[]>;
  getByUid: (uid: string) => Promise<User[]>;
  findUserIdsByPrivateDataUserIds: FindUserIdsByPrivateDataUserIds;
}

export type UserRepository = ISQLCustomRepository<User, CustomMethods, OmitBase>;

export type UserRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  User,
  CustomMethods,
  OmitBase
>;
