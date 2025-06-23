import type { PrivateDataUser } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type PrivateDataUserRepository = ISQLCustomRepository<PrivateDataUser>;

export type PrivateDataUserRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  PrivateDataUser
>;
