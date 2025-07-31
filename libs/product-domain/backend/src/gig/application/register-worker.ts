import type { Interfaces, UseCases } from '../domain';

import { Errors, Utils } from '@shared';

const PATH = 'REGISTER_WORKER_USE_CASE';

const validateError = Utils.makeValidateKeys(['code']);

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
      const error = validateError(e).data;

      if (error && error.code === '23505') {
        throw Errors.AlreadyExistError.create('Worker already exists', PATH);
      }

      throw Errors.InternalServerError.create('Failed to register worker', PATH);
    }
  };
}
