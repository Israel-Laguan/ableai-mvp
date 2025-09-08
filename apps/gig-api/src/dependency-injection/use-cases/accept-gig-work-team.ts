import { Gig } from '@product-domain/backend';
import { gigWorkTeamRepository } from '../repositories';

export const acceptOrRejectGigWorkTeam = Gig.App.makeAcceptGigWorkTeamUseCase({
  gigWorkTeamRepository,
});
