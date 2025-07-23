import { Gig } from '@product-domain/backend';
import { gigDb } from '../../db';

const {
  Infra: {
    Drizzle: {
      Repositories: { makeDrizzleGigWorkTeamsRepository, makeDrizzleSkillsRepository },
    },
  },
} = Gig;

export const gigWorkTeamRepository = makeDrizzleGigWorkTeamsRepository({ db: gigDb });
export const skillRepository = makeDrizzleSkillsRepository({ db: gigDb });
