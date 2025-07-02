import { Auth, Gig, Shared } from '@product-domain/backend';
import { gigDb } from '../../db';
import { UpdateInput, UpdateTransaction } from '../../interfaces';

const { BUYER_REPOSITORY, USER_REPOSITORY, WORKER_REPOSITORY } =
  Gig.Domain.Constants.GIG_DICTIONARY;

const runInTransaction: UpdateTransaction = Shared.Infra.Drizzle.Repositories.makeDrizzleUnitOfWork(
  [
    {
      db: gigDb,
      repositoryName: USER_REPOSITORY,
      repositoryMaker: Auth.Infra.Drizzle.Repositories.makeDrizzleUserRepository,
    },
    {
      db: gigDb,
      repositoryName: WORKER_REPOSITORY,
      repositoryMaker: Gig.Infra.Drizzle.Repositories.makeDrizzleWorkerRepository,
    },
    {
      db: gigDb,
      repositoryName: BUYER_REPOSITORY,
      repositoryMaker: Gig.Infra.Drizzle.Repositories.makeDrizzleBuyerRepository,
    },
  ]
);

export const updateUser = Gig.App.makeUpdateUserUseCase<UpdateInput>({
  runInTransaction,
  runInUpdate: async () => {
    return {
      rollback() {
        return void 0;
      },
    };
  },
});
