import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Slot } from '@models/gig';
import type { SlotRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { slots } from '../schemas';

export const makeDrizzleSlotsRepository: SlotRepositoryMaker<NodePgDatabase> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Slot>({
    db,
    schema: slots,
  });

  return {
    ...repository,
  };
};
