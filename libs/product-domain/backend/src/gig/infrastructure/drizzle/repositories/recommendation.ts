import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Recommendation } from '@models/gig';
import type { RecommendationRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { recommendations } from '../schemas';

export const makeDrizzleRecommendationsRepository: RecommendationRepositoryMaker<
  NodePgDatabase
> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Recommendation>({
    db,
    schema: recommendations,
  });

  return {
    ...repository,
  };
};
