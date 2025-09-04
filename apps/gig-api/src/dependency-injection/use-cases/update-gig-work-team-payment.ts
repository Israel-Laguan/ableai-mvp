import { Gig } from '@product-domain/backend';
import { gigWorkRepository, gigWorkTeamRepository, workerSkillRepository } from '../repositories';

export const updateGigWorkTeamPayment = Gig.App.makeUpdateGigWorkTeamPayment({
  gigWorkRepository,
  gigWorkTeamRepository,
  workerSkillRepository,
});
