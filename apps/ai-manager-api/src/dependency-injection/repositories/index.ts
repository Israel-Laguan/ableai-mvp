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
        makeDrizzleReviewRepository,
        makeDrizzleSkillsRepository,
        makeDrizzleSkillHiresRepository,
        makeDrizzleSlotsRepository,
        makeDrizzleStatisticsRepository,
        makeDrizzleWorkerRepository,
      },
    },
  },
} = Gig;

export const buyerRepository = makeDrizzleBuyerRepository({ db: gigDb });
export const privateDataUserRepository = makeDrizzlePrivateUserDataRepository({ db: privateGigDb });
export const reviewRepository = makeDrizzleReviewRepository({ db: gigDb });
export const skillRepository = makeDrizzleSkillsRepository({ db: gigDb });
export const skillHireRepository = makeDrizzleSkillHiresRepository({ db: gigDb });
export const slotRepository = makeDrizzleSlotsRepository({ db: gigDb });
export const statisticRepository = makeDrizzleStatisticsRepository({ db: gigDb });
export const userRepository = makeDrizzleUserRepository({ db: gigDb });
export const workerRepository = makeDrizzleWorkerRepository({ db: gigDb });
