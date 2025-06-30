import { Shared, Auth } from '@product-domain/backend';
import { gigDb, privateGigDb } from '../../db';
import { firebaseService } from '../services';
import { RegisterTransaction } from '../../interfaces';

const { BUYER_REPOSITORY, PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY } =
  Auth.Domain.Constants.AUTH_DICTIONARY;

const runInTransaction: RegisterTransaction =
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
    {
      db: gigDb,
      repositoryName: BUYER_REPOSITORY,
      repositoryMaker: Auth.Infra.Drizzle.Repositories.makeDrizzleBuyerRepository,
    },
  ]);

export const register = Auth.App.makeRegisterUserUseCase({
  registerProviders: {
    runAfterRegister: firebaseService.runAfterRegister,
    runBeforeRegister: firebaseService.runBeforeRegister,
  },
  runInTransaction,
});
