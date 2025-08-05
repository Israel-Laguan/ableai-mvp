import { Gig } from '@product-domain/backend';
import { buyerRepository, gigWorkRepository } from '../repositories';

export const getOneGigWork = Gig.App.makeGetOneGigWorkUseCase({
  buyerRepository,
  gigWorkRepository,
});
