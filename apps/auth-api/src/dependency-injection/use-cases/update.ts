import { Shared, Auth } from '@product-domain/backend';
import { gigDb, privateGigDb } from '../../db';
import { firebaseService } from '../services';
import { UpdateInput, UpdateOutput, UpdateTransaction } from '../../interfaces';

const { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY } = Auth.Domain.Constants.AUTH_DICTIONARY;

const runInTransaction: UpdateTransaction = Shared.Infra.Drizzle.Repositories.makeDrizzleUnitOfWork(
  [
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
  ]
);

export const update = Auth.App.makeUpdateUserUseCase<UpdateInput, UpdateOutput>({
  runInTransaction,
  runInUpdate: async input => {
    return await firebaseService.update(input);
  },
});
