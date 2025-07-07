import { Auth, Gig } from '@product-domain/backend';
import { gigDb, privateGigDb } from '../../db';

const {
  Infra: {
    Drizzle: {
      Repositories: { makeDrizzlePrivateUserDataRepository, makeDrizzleUserRepository },
    },
  },
} = Auth;
const {
  Infra: {
    Drizzle: {
      Repositories: {
        makeDrizzleBuyerRepository,
        makeDrizzleGigWorkTeamsRepository,
        makeDrizzleGigWorksRepository,
        makeDrizzleRecommendationsRepository,
        makeDrizzleReviewRepository,
        makeDrizzleSkillHiresRepository,
        makeDrizzleSkillsRepository,
        makeDrizzleSlotsRepository,
        makeDrizzleStatisticsRepository,
        makeDrizzleWorkerRepository,
      },
    },
  },
} = Gig;

export const repositories = {
  buyerRepository: makeDrizzleBuyerRepository({ db: gigDb }),
  gigWorkTeamsRepository: makeDrizzleGigWorkTeamsRepository({ db: gigDb }),
  gigWorksRepository: makeDrizzleGigWorksRepository({ db: gigDb }),
  privateDataUserRepository: makeDrizzlePrivateUserDataRepository({ db: privateGigDb }),
  recommendationsRepository: makeDrizzleRecommendationsRepository({ db: gigDb }),
  reviewsRepository: makeDrizzleReviewRepository({ db: gigDb }),
  skillHiresRepository: makeDrizzleSkillHiresRepository({ db: gigDb }),
  skillsRepository: makeDrizzleSkillsRepository({ db: gigDb }),
  slotsRepository: makeDrizzleSlotsRepository({ db: gigDb }),
  statisticsRepository: makeDrizzleStatisticsRepository({ db: gigDb }),
  userRepository: makeDrizzleUserRepository({ db: gigDb }),
  workerRepository: makeDrizzleWorkerRepository({ db: gigDb }),
};
