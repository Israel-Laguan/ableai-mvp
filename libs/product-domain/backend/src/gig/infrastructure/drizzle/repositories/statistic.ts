import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Statistic } from '@models/gig';
import type { StatisticRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { statistics } from '../schemas';

export const makeDrizzleStatisticsRepository: StatisticRepositoryMaker<NodePgDatabase> = ({
  db,
}) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Statistic>({
    db,
    schema: statistics,
  });

  return {
    ...repository,

    create: async ({ appRole, userId }) => {
      const [statistic] = await db
        .insert(statistics)
        .values({
          appRole,
          userId,
        })
        .returning();

      return statistic;
    },
  };
};
