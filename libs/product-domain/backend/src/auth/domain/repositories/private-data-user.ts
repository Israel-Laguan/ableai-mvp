import type { PrivateDataUser } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type GetNearPrivateDataUserIds = (
  latitude: number,
  longitude: number,
  radius?: number
) => Promise<number[]>;

interface CustomMethods {
  getNearPrivateDataUserIds: GetNearPrivateDataUserIds;
}

export type PrivateDataUserRepository = ISQLCustomRepository<PrivateDataUser, CustomMethods>;

export type PrivateDataUserRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  PrivateDataUser,
  CustomMethods
>;
