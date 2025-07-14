import { AiManager } from '@product-domain/backend';
import { buyerRepository, skillHireRepository } from '../repositories';

export const retrieveBuyerProfile = AiManager.App.makeRetrieveBuyerProfileUseCase({
  buyerRepository,
  skillHireRepository,
});
