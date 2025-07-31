import { AiManager } from '@product-domain/backend';
import { workerSkillRepository, workerRepository } from '../repositories';

export const retrieveWorkerProfile = AiManager.App.makeRetrieveWorkerProfileUseCase({
  workerSkillRepository,
  workerRepository,
});
