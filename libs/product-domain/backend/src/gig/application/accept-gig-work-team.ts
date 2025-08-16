import { Errors } from '@shared';
import { Interfaces, UseCases } from '../domain';
import { Constants, GigWorkTeamStatus } from '@models/gig';

const PATH = 'UPDATE_OFFER_STATUS';

export function makeAcceptGigWorkTeamUseCase({
  gigWorkTeamRepository,
}: Interfaces.MakeAcceptGigWorkTeamInput): UseCases.AcceptGigWorkTeamUseCase {
  return async ({ accepted, ...input }) => {
    let status: GigWorkTeamStatus = Constants.GIG_WORK_TEAM_STATUS.REJECTED;

    if (accepted) {
      status = Constants.GIG_WORK_TEAM_STATUS.ACCEPTED;
    }

    const gigWorkTeam = await gigWorkTeamRepository.updateStatus({
      ...input,
      status,
    });

    if (!gigWorkTeam) {
      throw Errors.NotFoundResourceError.create('pending gig work team not found', PATH);
    }

    return gigWorkTeam;
  };
}
