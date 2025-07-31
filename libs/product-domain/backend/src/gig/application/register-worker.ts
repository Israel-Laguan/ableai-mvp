import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'REGISTER_WORKER_USE_CASE';

export function makeRegisterWorkerUseCase({
  workerRepository,
}: Interfaces.MakeRegisterWorkerInput): UseCases.RegisterWorker {
  return async ({ recommendations, workerSkills, slots, worker }) => {
    try {
      return await workerRepository.registerWorker({
        worker,
        recommendations,
        workerSkills,
        slots,
      });
    } catch (e) {
      if (e instanceof Object && 'code' in e && typeof e.code === 'string' && e.code === '23505') {
        throw Errors.AlreadyExistError.create('Worker already exists', PATH);
      }

      throw Errors.InternalServerError.create('Failed to register worker', PATH);
    }
  };
}
