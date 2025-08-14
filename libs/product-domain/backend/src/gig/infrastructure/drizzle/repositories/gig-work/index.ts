import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { GigWork } from '@models/gig';
import type { GigWorkRepositoryMaker } from '../../../../domain/repositories';

import { Infra } from '../../../../../shared';
import { gigWorks } from '../../schemas';
import { makeGetAllGigWorks } from './get-all';
import { makeGetOneByIdAndUserId } from './get-on-by-id-and-user-id';
import { makeGetAllGigWorkPayments } from './get-all-gig-work-payments';

export const makeDrizzleGigWorksRepository: GigWorkRepositoryMaker<NodePgDatabase> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<GigWork>({
    db,
    schema: gigWorks,
  });

  return {
    ...repository,

    getAll: makeGetAllGigWorks(db),

    getAllGigWorkPayments: makeGetAllGigWorkPayments(db),

    getOneByIdAndUserId: makeGetOneByIdAndUserId(db),
  };
};
