import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'UPDATE_GIG_WORK_TEAM';

export function makeUpdateGigWorkTeamStatusUseCase({
  gigWorkTeamRepository,
}: Interfaces.MakeUpdateGigWorkTeamInput): UseCases.UpdateGigWorkTeamStatus {
  return async input => {
    const gigWorkTeam = await gigWorkTeamRepository.updateStatus(input);

    if (!gigWorkTeam) {
      throw Errors.NotFoundResourceError.create('Invalid Gig Work Team update data', PATH);
    }

    return gigWorkTeam;
  };
}
