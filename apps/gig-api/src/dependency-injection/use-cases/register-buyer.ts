import { Gig, Shared } from '@product-domain/backend';
import { gigDb } from '../../db';

const {
  Domain: {
    Constants: {
      REGISTER_BUYER_REPOSITORIES: { BUYER_REPOSITORY, STATISTIC_REPOSITORY },
    },
  },
  Infra: {
    Drizzle: {
      Repositories: { makeDrizzleBuyerRepository, makeDrizzleStatisticsRepository },
    },
  },
} = Gig;

const runInTransaction: Gig.Domain.Services.RegisterBuyerTransaction =
  Shared.Infra.Drizzle.Repositories.makeDrizzleUnitOfWork([
    {
      db: gigDb,
      repositoryName: BUYER_REPOSITORY,
      repositoryMaker: makeDrizzleBuyerRepository,
    },
    {
      db: gigDb,
      repositoryName: STATISTIC_REPOSITORY,
      repositoryMaker: makeDrizzleStatisticsRepository,
    },
  ]);

export const registerBuyer = Gig.App.makeRegisterBuyerUseCase({
  runInTransaction,
});
