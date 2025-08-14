import { Gig } from '@product-domain/backend';
import { gigWorkRepository } from '../repositories';

export const getAllGigWorkPayments = Gig.App.makeGetAllGigWorkPaymentsUseCase({
  gigWorkRepository,
});
