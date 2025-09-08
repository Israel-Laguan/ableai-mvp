import { Errors } from '@shared';
import { Interfaces, UseCases } from '../domain';
import { Constants } from '@models/gig';
import { match } from 'ts-pattern';

const PATH = 'UPDATE_OFFER_STATUS';

export function makeAcceptGigWorkTeamUseCase({
  gigWorkTeamRepository,
}: Interfaces.MakeAcceptGigWorkTeamInput): UseCases.AcceptGigWorkTeamUseCase {
  return async ({ accepted, ...input }) => {
    const status = match(accepted)
      .with(true, () => {
        return Constants.GIG_WORK_TEAM_STATUS.ACCEPTED;
      })
      .otherwise(() => {
        return Constants.GIG_WORK_TEAM_STATUS.REJECTED;
      });

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
