import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { User, Infra as ModelsAutInfra } from '@models/auth';
import type { UpdateEntityInput } from '@models/shared';
import type { Repositories } from '../../../domain';
import { Infra } from '../../../../shared';
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
    updateByPrivateDataUserId: async (id: number, input: UpdateEntityInput<User>) => {
      const result = db.update(users).set(input).where(eq(users.privateDataUserId, id)).returning({
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
