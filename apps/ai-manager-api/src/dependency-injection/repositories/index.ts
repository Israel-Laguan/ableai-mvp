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
        makeDrizzleWorkerSkillRepository,
        makeDrizzleSkillHiresRepository,
        makeDrizzleWorkerRepository,
      },
    },
  },
} = Gig;

export const buyerRepository = makeDrizzleBuyerRepository({ db: gigDb });
export const privateDataUserRepository = makeDrizzlePrivateUserDataRepository({ db: privateGigDb });
export const reviewRepository = makeDrizzleReviewRepository({ db: gigDb });
export const workerSkillRepository = makeDrizzleWorkerSkillRepository({ db: gigDb });
export const skillHireRepository = makeDrizzleSkillHiresRepository({ db: gigDb });
export const userRepository = makeDrizzleUserRepository({ db: gigDb });
export const workerRepository = makeDrizzleWorkerRepository({ db: gigDb });
