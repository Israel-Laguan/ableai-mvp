import type { Statistic } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type StatisticRepository = ISQLCustomRepository<Statistic>;

export type StatisticRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Statistic>;
