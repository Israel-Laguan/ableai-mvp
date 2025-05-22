import { gigDb, privateGigDb } from '../db';

import { Auth } from '@product-domain/backend';

const { makeUserDrizzleRepository, makeDataPrivateUserDrizzleRepository } =
  Auth.Infra.Drizzle.Repository;

export const userRepository = makeUserDrizzleRepository(gigDb);

export const privateDataUserRepository = makeDataPrivateUserDrizzleRepository(privateGigDb);
