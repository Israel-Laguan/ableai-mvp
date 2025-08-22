import { Gig } from '@product-domain/backend';
import { gigWorkTeamRepository, workerSkillRepository } from '../repositories';

export const updateGigWorkTeamPayment = Gig.App.makeUpdateGigWorkTeamPayment({
  gigWorkTeamRepository,
  workerSkillRepository,
});
