import { Shared, Auth } from '@product-domain/backend';
import { gigDb, privateGigDb } from '../../db';
import { sendEmailLink } from '../services';

const { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY } = Auth.Domain.Constants.AUTH_DICTIONARY;

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

export const register = Auth.App.makeRegisterUserUseCase({
  runInTransaction,
  sendEmailLink,
});
