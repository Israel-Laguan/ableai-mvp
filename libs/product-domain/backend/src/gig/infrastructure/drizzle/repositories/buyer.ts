import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

import type { Buyer } from '@models/gig';
import type { BuyerRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { buyers } from '../schemas';

export const makeDrizzleBuyerRepository: BuyerRepositoryMaker<NodePgDatabase> = ({ db }) => {
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
