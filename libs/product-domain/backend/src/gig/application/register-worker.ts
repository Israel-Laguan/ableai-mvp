import { APP_ROLE } from '@models/shared';
import { Constants, Interfaces, UseCases } from '../domain';

const {
  REGISTER_WORKER_REPOSITORIES: { STATISTIC_REPOSITORY, WORKER_REPOSITORY },
} = Constants;

export function makeRegisterWorkerUseCase({
  runInTransaction,
}: Interfaces.MakeRegisterWorkerInput): UseCases.RegisterWorker {
  return async input => {
    return await runInTransaction(async repositoryManager => {
      const workerRepository = repositoryManager.getRepository(WORKER_REPOSITORY);
      const statisticRepository = repositoryManager.getRepository(STATISTIC_REPOSITORY);
      const [[worker], statistic] = await Promise.all([
        workerRepository.create(input),
        statisticRepository.create({
          appRole: APP_ROLE.WORKER,
          userId: input.userId,
        }),
      ]);

      return { worker, statistic };
    });
  };
}
