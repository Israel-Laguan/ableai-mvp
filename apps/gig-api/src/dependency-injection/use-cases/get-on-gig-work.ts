import { Gig } from '@product-domain/backend';
import { gigWorkRepository } from '../repositories';

export const getOneGigWork = Gig.App.makeGetOneGigWorkUseCase({
  gigWorkRepository,
});
