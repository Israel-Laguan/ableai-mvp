import type { Worker } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type WorkerRepository = ISQLCustomRepository<Worker>;

export type WorkerRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Worker>;
