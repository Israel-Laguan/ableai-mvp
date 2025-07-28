import type { Worker, Skill, Slot } from '@models/gig';
import type { CreateEntityInput } from '@models/shared';
import type { Constants, Repositories, Services } from '..';

export type RegisterWorkerRepositoriesRecord = {
  [Constants.REGISTER_WORKER_REPOSITORIES.WORKER_REPOSITORY]: Repositories.WorkerRepository;
  [Constants.REGISTER_WORKER_REPOSITORIES.SKILL_REPOSITORY]: Repositories.SkillRepository;
  [Constants.REGISTER_WORKER_REPOSITORIES.SLOT_REPOSITORY]: Repositories.SlotRepository;
};

export interface MakeRegisterWorkerInput {
  runInTransaction: Services.RegisterWorkerTransaction;
}

export type RegisterWorkerInput = CreateEntityInput<Omit<Worker, 'feedbackSummary'>>;

export type RegisterWorkerRequestBody = Omit<RegisterWorkerInput, 'userId'>;

export type RegisterWorkerOutput = {
  worker: Worker;
  skills: Skill[];
  slots: Slot[];
};
