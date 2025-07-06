import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { GigWorkTeam } from '@models/gig';
import type { GigWorkTeamRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { gigWorkTeams } from '../schemas';

export const makeDrizzleGigWorkTeamsRepository: GigWorkTeamRepositoryMaker<NodePgDatabase> = ({
  db,
}) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<GigWorkTeam>({
    db,
    schema: gigWorkTeams,
  });

  return {
    ...repository,
  };
};
