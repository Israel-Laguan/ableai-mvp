import type { GigWork } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type GigWorkRepository = ISQLCustomRepository<GigWork>;

export type GigWorkRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, GigWork>;
