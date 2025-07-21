import type { Interfaces } from '..';

export type MatchWorkers = (
  input: Interfaces.MatchWorkersInput
) => Promise<Interfaces.MatchedWorker[] | []>;

export type RetrieveBuyerProfile = (userId: number) => Promise<Interfaces.BuyerProfile>;

export type RetrieveUserProfile = (userId: number) => Promise<Interfaces.UserProfile>;

export type RetrieveWorkerProfile = (userId: number) => Promise<Interfaces.WorkerProfile>;
