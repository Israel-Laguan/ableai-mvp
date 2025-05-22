import { Infra } from '@models/auth';

import { users } from '../schemas';
import { UserRepository } from '../../../domain';
import { Repository } from '../../../../shared/infrastructure/drizzle';

type DrizzleDb = Repository.DrizzleDb;

export const makeUserDrizzleRepository = (db: DrizzleDb): UserRepository => {
  return {
    create: async (userInput: Infra.UserCreateInput) => {
      const result = db
        .insert(users)
        .values({
          roleId: 1,
          password: userInput.password,
          privateDataUserId: userInput.privateDataUserId,
        })
        .returning({
          id: users.id,
          roleId: users.roleId,
          enabled: users.enabled,
          privateDataUserId: users.privateDataUserId,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        });

      return result;
    },
  };
};
