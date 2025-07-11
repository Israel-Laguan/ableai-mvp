import { AiManager } from '@product-domain/backend';
import { skillRepository, workerRepository } from '../repositories';

export const retrieveWorkerProfile = AiManager.App.makeRetrieveWorkerProfileUseCase({
  skillRepository,
  workerRepository,
});
