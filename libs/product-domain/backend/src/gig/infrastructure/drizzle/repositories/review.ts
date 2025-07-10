import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Review } from '@models/gig';
import type { ReviewRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { reviews } from '../schemas';

export const makeDrizzleReviewRepository: ReviewRepositoryMaker<NodePgDatabase> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Review>({
    db,
    schema: reviews,
  });

  return {
    ...repository,
  };
};
