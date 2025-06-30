import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Buyer } from '@models/auth';
import type { WorkerRepositoryMaker } from '../../../domain/repositories';
import { Infra } from '../../../../shared';
import { buyers } from '../schemas';
import { eq } from 'drizzle-orm';

export const makeDrizzleWorkerRepository: WorkerRepositoryMaker<NodePgDatabase> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Buyer>({
    db,
    schema: buyers,
  });

  return {
    ...repository,
    updateByUserId: async (userId, input) => {
      return await db.update(buyers).set(input).where(eq(buyers.userId, userId)).returning();
    },
  };
};
