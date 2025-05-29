import type { PrivateDataUser } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

interface CustomMethods {
  getByEmail: (input: { email: string }) => Promise<PrivateDataUser | null>;
}

export type PrivateDataUserRepository = ISQLCustomRepository<PrivateDataUser, CustomMethods>;

export type PrivateDataUserRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  PrivateDataUser,
  CustomMethods
>;
