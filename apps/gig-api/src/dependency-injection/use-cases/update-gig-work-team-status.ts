import { Gig } from '@product-domain/backend';
import { gigWorkTeamRepository } from '../repositories';

export const updateGigWorkTeamStatus = Gig.App.makeUpdateGigWorkTeamStatusUseCase({
  gigWorkTeamRepository,
});
