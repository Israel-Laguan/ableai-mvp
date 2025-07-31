import { Gig } from '@product-domain/backend';
import { gigWorkRepository } from '../repositories';

export const getAllGigWorks = Gig.App.makeGetAllGigWorksUseCase({
  gigWorkRepository,
});
