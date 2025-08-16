import { Gig } from '@product-domain/backend';
import { gigWorkTeamRepository } from '../repositories';

export const updateGigWorkTeamPayment = Gig.App.makeUpdateGigWorkTeamPayment({
  gigWorkTeamRepository,
});
