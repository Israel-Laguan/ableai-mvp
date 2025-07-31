import { Gig } from '@product-domain/backend';
import { buyerRepository, gigWorkRepository } from '../repositories';

export const registerGigWork = Gig.App.makeRegisterGigWorkUseCase({
  buyerRepository,
  gigWorkRepository,
});
