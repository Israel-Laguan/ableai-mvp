import { Gig, Shared } from '@product-domain/backend';
import { gigDb } from '../../db';

const {
  Domain: {
    Constants: {
      REGISTER_WORKER_REPOSITORIES: { WORKER_REPOSITORY },
    },
  },
  Infra: {
    Drizzle: {
      Repositories: { makeDrizzleWorkerRepository },
    },
  },
} = Gig;

const runInTransaction: Gig.Domain.Services.RegisterWorkerTransaction =
  Shared.Infra.Drizzle.Repositories.makeDrizzleUnitOfWork([
    {
      db: gigDb,
      repositoryName: WORKER_REPOSITORY,
      repositoryMaker: makeDrizzleWorkerRepository,
    },
  ]);

export const registerWorker = Gig.App.makeRegisterWorkerUseCase({
  runInTransaction,
});
