import { AiManager } from '@product-domain/backend';
import { privateDataUserRepository, userRepository, workerRepository } from '../repositories';

export const matchWorkers = AiManager.App.makeMatchWorkersUseCase({
  privateDataUserRepository,
  userRepository,
  workerRepository,
});
