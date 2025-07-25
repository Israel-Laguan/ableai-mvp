import { Gig } from '@product-domain/backend';
import { gigWorkTeamRepository, skillRepository } from '../repositories';

export const registerGigWorkTeam = Gig.App.makeRegisterGigWorkTeamUseCase({
  gigWorkTeamRepository,
  skillRepository,
});
