import { Gig } from '@product-domain/backend';
import { gigWorkRepository } from '../repositories';

export const getAllCompletedGigWorkResumes = Gig.App.makeGetAllCompletedGigWorkResumesUseCase({
  gigWorkRepository,
});
