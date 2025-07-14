import type { PrivateDataUser } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker, Location } from '@models/shared';

interface CustomMethods {
  findNearUsers(
    privateDataUserId: string,
    distanceInKm?: number,
    location?: Location
  ): Promise<PrivateDataUser[]>;
}

export type PrivateDataUserRepository = ISQLCustomRepository<PrivateDataUser, CustomMethods>;

export type PrivateDataUserRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  PrivateDataUser,
  CustomMethods
>;
