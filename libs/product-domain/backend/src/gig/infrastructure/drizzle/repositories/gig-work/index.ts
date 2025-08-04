import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { GigWork } from '@models/gig';
import type { GigWorkRepositoryMaker } from '../../../../domain/repositories';

import { Infra } from '../../../../../shared';
import { gigWorks } from '../../schemas';
import { makeGetAllGigWorks } from './get-all';

export const makeDrizzleGigWorksRepository: GigWorkRepositoryMaker<NodePgDatabase> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<GigWork>({
    db,
    schema: gigWorks,
  });

  return {
    ...repository,

    getAll: makeGetAllGigWorks(db),
  };
};
