import { AiManager } from '@product-domain/backend';
import {
  privateDataUserRepository,
  skillRepository,
  slotRepository,
  statisticRepository,
  userRepository,
  workerRepository,
} from '../repositories';

export const matchWorkers = AiManager.App.makeMatchWorkersUseCase({
  privateDataUserRepository,
  skillRepository,
  slotRepository,
  statisticRepository,
  userRepository,
  workerRepository,
});
