import type { GigWorkTeam } from '@models/gig';
import type { PaginationResult } from '@models/shared';
import type { Interfaces } from '..';

export type GetAllGigWorkTeamsUseCase = (
  input: Interfaces.GetAllGigWorkTeamsBaseInput
) => Promise<PaginationResult<GigWorkTeam>>;

export type GetOneGigWorkTeamUseCase = (
  input: Interfaces.GetOneGigWorkTeamInput
) => Promise<Interfaces.GetOneGigWorkTeamOutput>;
