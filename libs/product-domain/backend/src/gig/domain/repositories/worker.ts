import type { Infra, Worker } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type MatchWorkers = (input: Infra.MatchWorkersInput) => Promise<Infra.MatchedWorker[]>;

interface CustomMethods {
  updateByUserId: (userId: number, input: Infra.UpdateWorkerInput) => Promise<Worker[]>;
  matchWorkers: MatchWorkers;
}

export type WorkerRepository = ISQLCustomRepository<Worker, CustomMethods>;

export type WorkerRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  Worker,
  CustomMethods
>;
