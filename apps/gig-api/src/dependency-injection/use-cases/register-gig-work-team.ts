import { Gig } from '@product-domain/backend';
import { gigWorkTeamRepository, workerSkillRepository } from '../repositories';

export const registerGigWorkTeam = Gig.App.makeRegisterGigWorkTeamUseCase({
  gigWorkTeamRepository,
  workerSkillRepository,
});
