import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { User, Infra as ModelsAutInfra } from '@models/auth';
import type { Repositories } from '../../../domain';
import { Infra } from '../../../../shared';
import { users } from '../schemas';

export const makeDrizzleUserRepository: Repositories.UserRepositoryMaker<NodePgDatabase> = ({
  db,
}) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<User>({
    db,
    schema: users,
  });

  return {
    ...repository,

    create: async (userInput: ModelsAutInfra.UserCreateInput) => {
      return await db
        .insert(users)
        .values({
          uid: userInput.uid,
          roleId: 1,
          privateDataUserId: userInput.privateDataUserId,
        })
        .returning({
          id: users.id,
          uid: users.uid,
          roleId: users.roleId,
          privateDataUserId: users.privateDataUserId,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        });
    },
    getByPrivateDataUserId: async (id: number) => {
      return await db.select().from(users).where(eq(users.privateDataUserId, id)).limit(1);
    },

    getByUid: async (uid: string) => {
      return await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    },
  };
};
