import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { GigWorkTeam } from '@models/gig';
import type { GigWorkTeamRepositoryMaker } from '../../../../domain/repositories';

import { Infra } from '../../../../../shared';
import { gigWorkTeams } from '../../schemas';
import { makeUpdateStatus } from './update-status';
import { makeGetAllGigWorkTeams } from './get-all';
import { makeUpdatePayment } from './update-payment';
import { makeGetOneGigWorkTeam } from './get-one';

export const makeDrizzleGigWorkTeamsRepository: GigWorkTeamRepositoryMaker<NodePgDatabase> = ({
  db,
}) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<GigWorkTeam>({
    db,
    schema: gigWorkTeams,
  });

  return {
    ...repository,

    create: async input => {
      const queryResult = await db.insert(gigWorkTeams).values(input).returning();
      return queryResult[0];
    },

    getAll: makeGetAllGigWorkTeams(db),

    getOne: makeGetOneGigWorkTeam(db),

    updateStatus: makeUpdateStatus(db),

    updatePayment: makeUpdatePayment(db),
  };
};
