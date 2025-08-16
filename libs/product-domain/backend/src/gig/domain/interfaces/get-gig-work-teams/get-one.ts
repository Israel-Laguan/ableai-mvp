import type { APP_ROLE } from '@models/shared';
import type { Repositories } from '../..';
import type { GigWorkTeam } from '@models/gig';

export type MakeGetOneGigWorkTeamInput = {
  gigWorkTeamRepository: Repositories.GigWorkTeamRepository;
};

export type GetOneGigWorkTeamInput = Pick<GigWorkTeam, 'id'> & {
  userId: number;
  appRole: APP_ROLE;
};

export type GetOneGigWorkTeamRequestParams = { id: string; appRole: APP_ROLE };

export type GetOneGigWorkTeamOutput = GigWorkTeam;
