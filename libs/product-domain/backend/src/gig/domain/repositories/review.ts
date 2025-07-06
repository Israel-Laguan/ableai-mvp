import type { Review } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type ReviewRepository = ISQLCustomRepository<Review>;

export type ReviewRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Review>;
