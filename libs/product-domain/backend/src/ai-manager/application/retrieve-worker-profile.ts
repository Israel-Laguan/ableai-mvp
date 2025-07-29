import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'RETRIEVE_WORKER_PROFILE';

export function makeRetrieveWorkerProfileUseCase({
  workerSkillRepository,
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

    const workerSkills = await workerSkillRepository.getAll({
      where: { fields: [{ field: 'workerId', value: worker.id }] },
    });

    return {
      worker,
      workerSkills: workerSkills.results,
    };
  };
}
