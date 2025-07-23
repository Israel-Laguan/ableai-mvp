import { Gig } from '@product-domain/backend';
import { gigDb } from '../../db';

const {
  Infra: {
    Drizzle: {
      Repositories: { makeDrizzleBuyerRepository, makeDrizzleGigWorksRepository },
    },
  },
} = Gig;

export const gigWorkRepository = makeDrizzleGigWorksRepository({ db: gigDb });
export const buyerRepository = makeDrizzleBuyerRepository({ db: gigDb });
