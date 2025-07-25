import type { Worker, Statistic } from '@models/gig';
import type { CreateEntityInput } from '@models/shared';
import type { Constants, Repositories, Services } from '..';

export type RegisterWorkerRepositoriesRecord = {
  [Constants.REGISTER_WORKER_REPOSITORIES.WORKER_REPOSITORY]: Repositories.WorkerRepository;
  [Constants.REGISTER_WORKER_REPOSITORIES.STATISTIC_REPOSITORY]: Repositories.StatisticRepository;
};

export interface MakeRegisterWorkerInput {
  runInTransaction: Services.RegisterWorkerTransaction;
}

export type RegisterWorkerInput = CreateEntityInput<Omit<Worker, 'feedbackSummary'>>;

export type RegisterWorkerRequestBody = Omit<RegisterWorkerInput, 'userId'>;

export type RegisterWorkerOutput = {
  worker: Worker;
  statistic: Statistic;
};
