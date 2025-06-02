import type { User, Infra } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker, UpdateEntityInput } from '@models/shared';

type OmitBase = 'create';

interface CustomMethods {
  create: (userInput: Infra.UserCreateInput) => Promise<User[]>;
  updateByPrivateDataUserId: (id: number, input: UpdateEntityInput<User>) => Promise<User[]>;
}

export type UserRepository = ISQLCustomRepository<User, CustomMethods, OmitBase>;

export type UserRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  User,
  CustomMethods,
  OmitBase
>;
