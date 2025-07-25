import type { Infra, Statistic } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

type OmitBase = 'create';

type CustomMethods = {
  create: (input: Infra.CreateStatisticInput) => Promise<Statistic>;
};

export type StatisticRepository = ISQLCustomRepository<Statistic, CustomMethods, OmitBase>;

export type StatisticRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  Statistic,
  CustomMethods,
  OmitBase
>;
