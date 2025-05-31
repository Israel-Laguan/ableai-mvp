import { Shared, Auth } from '@product-domain/backend';
import { SharedDictionary } from '@models/shared';
import { gigDb, privateGigDb } from '../../db';
import { emailLinkService } from '../services';

type PrivateDataUserRepository = Auth.Domain.Repositories.PrivateDataUserRepository;
type UserRepository = Auth.Domain.Repositories.UserRepository;

const { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY } = SharedDictionary;

const runInTransaction = Shared.Infra.Drizzle.Repositories.makeDrizzleUnitOfWork<
  PrivateDataUserRepository | UserRepository
>([
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
