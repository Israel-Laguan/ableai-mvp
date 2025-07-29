import { Gig, Shared } from '@product-domain/backend';
import { gigDb } from '../../db';

const {
  Domain: {
    Constants: {
      REGISTER_BUYER_REPOSITORIES: { BUYER_REPOSITORY },
    },
  },
  Infra: {
    Drizzle: {
      Repositories: { makeDrizzleBuyerRepository },
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
  ]);

export const registerBuyer = Gig.App.makeRegisterBuyerUseCase({
  runInTransaction,
});
