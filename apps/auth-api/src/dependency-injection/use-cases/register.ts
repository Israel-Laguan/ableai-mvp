import { Shared, Auth } from '@product-domain/backend';
import { SharedDictionary } from '@models/shared';
import { gigDb, privateGigDb } from '../../db';
import { emailLinkService } from '../services';

const { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY } = SharedDictionary;

const runInTransaction: Auth.Domain.Repositories.RegisterTransaction =
  Shared.Infra.Drizzle.Repositories.makeDrizzleUnitOfWork([
    {
      db: privateGigDb,
      repositoryName: PRIVATE_USER_DATA_REPOSITORY,
      repositoryMaker: Auth.Infra.Drizzle.Repositories.makeDrizzlePrivateUserDataRepository,
    },
    {
      db: gigDb,
      repositoryName: USER_REPOSITORY,
      repositoryMaker: Auth.Infra.Drizzle.Repositories.makeDrizzleUserRepository,
    },
  ]);

export const registerUseCase = Auth.App.makeRegisterUserUseCase({
  runInTransaction,
  emailLinkService,
});
