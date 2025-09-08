import { Gig } from '@product-domain/backend';
import { gigWorkTeamRepository } from '../repositories';

export const getOneGigWorkTeam = Gig.App.makeGetOneGigWorkTeamUseCase({
  gigWorkTeamRepository,
});
