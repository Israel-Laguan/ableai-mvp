import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'RETRIEVE_WORKER_PROFILE';

export function makeRetrieveWorkerProfileUseCase({
  skillRepository,
  workerRepository,
}: Interfaces.MakeRetrieveWorkerProfileConfig): UseCases.RetrieveWorkerProfile {
  return async userId => {
    const worker = (
      await workerRepository.getAll({
        where: {
          fields: [{ field: 'userId', value: userId }],
        },
      })
    ).results[0];

    if (!worker) {
      throw Errors.NotFoundResourceError.create('Worker not found', PATH);
    }

    const skills = await skillRepository.getAll({
      where: { fields: [{ field: 'workerId', value: worker.id }] },
    });

    return {
      worker,
      skills: skills.results,
    };
  };
}
