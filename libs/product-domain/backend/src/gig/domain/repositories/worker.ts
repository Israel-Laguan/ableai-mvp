import type { Infra, Worker } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';
import { Interfaces } from '..';

export type MatchWorkers = (input: Infra.MatchWorkersInput) => Promise<Infra.MatchedWorker[]>;

export type RegisterWorker = (
  input: Interfaces.RegisterWorkerInput
) => Promise<Interfaces.RegisterWorkerOutput>;

interface CustomMethods {
  matchWorkers: MatchWorkers;
  registerWorker: RegisterWorker;
  updateByUserId: (userId: number, input: Infra.UpdateWorkerInput) => Promise<Worker[]>;
}

export type WorkerRepository = ISQLCustomRepository<Worker, CustomMethods>;

export type WorkerRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  Worker,
  CustomMethods
>;
