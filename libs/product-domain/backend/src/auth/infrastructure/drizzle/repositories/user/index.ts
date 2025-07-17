import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { eq } from 'drizzle-orm';

import type { User, Infra as ModelsAutInfra } from '@models/auth';
import type { Repositories } from '../../../../domain';

import { Infra } from '../../../../../shared';
import { ROLES } from '../../../../domain/constants';
import { users } from '../../schemas';
import { makeFindUserIdsByPrivateDataUserIds } from './find-user-ids-by-private-data-user-ids';

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
          roleId: ROLES.USER,
          privateDataUserId: userInput.privateDataUserId,
        })
        .returning();
    },
    getByPrivateDataUserId: async (id: number) => {
      return await db.select().from(users).where(eq(users.privateDataUserId, id)).limit(1);
    },

    getByUid: async (uid: string) => {
      return await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    },

    findUserIdsByPrivateDataUserIds: makeFindUserIdsByPrivateDataUserIds(db),
  };
};
