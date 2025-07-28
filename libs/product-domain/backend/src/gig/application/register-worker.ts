import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

type PgError = {
  code: string;
};

const PATH = 'REGISTER_WORKER_USE_CASE';

export function makeRegisterWorkerUseCase({
  workerRepository,
}: Interfaces.MakeRegisterWorkerInput): UseCases.RegisterWorker {
  return async ({ recommendations, skills, slots, worker }) => {
    try {
      return await workerRepository.registerWorker({
        worker,
        recommendations,
        skills,
        slots,
      });
    } catch (e) {
      if ((e as PgError)?.code === '23505') {
        throw Errors.AlreadyExistError.create('Worker already exists', PATH);
      }

      throw Errors.InternalServerError.create('Failed to register worker', PATH);
    }
  };
}
