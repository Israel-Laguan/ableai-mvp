import { Gig, Shared } from '@product-domain/backend';
import { gigDb } from '../../db';

const {
  Domain: {
    Constants: {
      REGISTER_WORKER_REPOSITORIES: { WORKER_REPOSITORY, STATISTIC_REPOSITORY },
    },
  },
  Infra: {
    Drizzle: {
      Repositories: { makeDrizzleWorkerRepository, makeDrizzleStatisticsRepository },
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
    {
      db: gigDb,
      repositoryName: STATISTIC_REPOSITORY,
      repositoryMaker: makeDrizzleStatisticsRepository,
    },
  ]);

export const registerWorker = Gig.App.makeRegisterWorkerUseCase({
  runInTransaction,
});
