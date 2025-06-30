import { Auth } from '@product-domain/backend';
import { gigDb, privateGigDb } from '../../db';

const {
  Infra: {
    Drizzle: {
      Repositories: { makeDrizzlePrivateUserDataRepository, makeDrizzleUserRepository },
    },
  },
} = Auth;

export const userRepository = makeDrizzleUserRepository({ db: gigDb });

export const privateDataUserRepository = makeDrizzlePrivateUserDataRepository({
  db: privateGigDb,
});
