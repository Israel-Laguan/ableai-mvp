import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'GET_ONE_GIG_WORK_TEAM';

export function makeGetOneGigWorkTeamUseCase({
  gigWorkTeamRepository,
}: Interfaces.MakeGetOneGigWorkTeamInput): UseCases.GetOneGigWorkTeamUseCase {
  return async input => {
    const gigWorkTeam = await gigWorkTeamRepository.getOne(input);

    if (!gigWorkTeam) {
      throw Errors.NotFoundResourceError.create('Gig work team not found', PATH);
    }

    return gigWorkTeam;
  };
}
