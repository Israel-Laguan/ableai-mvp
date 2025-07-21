import { Auth } from '@product-domain/backend';
import { gigDb, privateGigDb } from '../../db';

const {
  Infra: {
    Drizzle: {
      Repositories: {
        makeDrizzlePrivateUserDataRepository,
        makeDrizzleRoleRepository,
        makeDrizzleUserRepository,
      },
    },
  },
} = Auth;

export const privateDataUserRepository = makeDrizzlePrivateUserDataRepository({
  db: privateGigDb,
});
export const roleRepository = makeDrizzleRoleRepository({ db: gigDb });
export const userRepository = makeDrizzleUserRepository({ db: gigDb });
