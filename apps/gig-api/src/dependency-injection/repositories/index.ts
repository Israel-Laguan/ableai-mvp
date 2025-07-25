import { Gig } from '@product-domain/backend';
import { gigDb } from '../../db';

const {
  Infra: {
    Drizzle: {
      Repositories: {
        makeDrizzleBuyerRepository,
        makeDrizzleGigWorksRepository,
        makeDrizzleGigWorkTeamsRepository,
        makeDrizzleSkillsRepository,
      },
    },
  },
} = Gig;

export const gigWorkRepository = makeDrizzleGigWorksRepository({ db: gigDb });
export const buyerRepository = makeDrizzleBuyerRepository({ db: gigDb });
export const gigWorkTeamRepository = makeDrizzleGigWorkTeamsRepository({ db: gigDb });
export const skillRepository = makeDrizzleSkillsRepository({ db: gigDb });
