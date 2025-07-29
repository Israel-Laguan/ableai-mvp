import { Gig } from '@product-domain/backend';
import { workerRepository } from '../repositories';

export const registerWorker = Gig.App.makeRegisterWorkerUseCase({
  workerRepository,
});
