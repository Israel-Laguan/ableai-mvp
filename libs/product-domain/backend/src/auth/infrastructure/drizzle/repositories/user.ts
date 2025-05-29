import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { User, Infra as ModelsAutInfra } from '@models/auth';
import { Infra } from '../../../../shared';
import { Repositories } from '../../../domain';
import { users } from '../schemas';

export const makeDrizzleUserRepository: Repositories.UserRepositoryMaker<NodePgDatabase> = ({
  db,
}: {
  db: NodePgDatabase;
}) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<User>({
    db,
    schema: users,
  });

  return {
    ...repository,

    create: async (userInput: ModelsAutInfra.UserCreateInput) => {
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
