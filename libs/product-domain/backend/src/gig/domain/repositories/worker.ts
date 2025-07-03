import type { Infra, Worker } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

interface CustomMethods {
  updateByUserId: (userId: number, input: Infra.UpdateWorkerInput) => Promise<Worker[]>;
}

export type WorkerRepository = ISQLCustomRepository<Worker, CustomMethods>;

export type WorkerRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  Worker,
  CustomMethods
>;
