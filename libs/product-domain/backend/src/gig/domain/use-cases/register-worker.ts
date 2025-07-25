import { RegisterWorkerInput, RegisterWorkerOutput } from '../interfaces';

export type RegisterWorker = (input: RegisterWorkerInput) => Promise<RegisterWorkerOutput>;
