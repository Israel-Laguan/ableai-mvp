import type { Recommendation } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type RecommendationRepository = ISQLCustomRepository<Recommendation>;

export type RecommendationRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  Recommendation
>;
