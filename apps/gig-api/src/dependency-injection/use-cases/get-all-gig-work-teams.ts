import { Gig } from '@product-domain/backend';
import { gigWorkTeamRepository } from '../repositories';

export const getAllGigWorkTeams = Gig.App.makeGetAllGigWorkTeamsUseCase({
  gigWorkTeamRepository,
});
