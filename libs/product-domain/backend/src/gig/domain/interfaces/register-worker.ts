import type { Worker, Skill, Slot, Recommendation } from '@models/gig';
import type { CreateEntityInput } from '@models/shared';
import type { Repositories } from '..';
import type { RegisterRecommendationInput, RegisterSkillInput, RegisterSlotInput } from '.';

export interface MakeRegisterWorkerInput {
  workerRepository: Repositories.WorkerRepository;
}

export type RegisterWorkerInput = {
  worker: CreateEntityInput<Omit<Worker, 'feedbackSummary'>>;
  skills: RegisterSkillInput[];
  slots: RegisterSlotInput[];
  recommendations: RegisterRecommendationInput[];
};

export type RegisterWorkerServiceInput = Omit<RegisterWorkerInput, 'skills' | 'worker'> & {
  worker: Omit<RegisterWorkerInput['worker'], 'tags'> & { tags?: string[] };
  skills: (Omit<RegisterWorkerInput['skills'][number], 'equipment'> & {
    equipment?: string[];
  })[];
};

export type RegisterWorkerRequestBody = Omit<RegisterWorkerServiceInput, 'worker'> & {
  worker: Omit<RegisterWorkerServiceInput['worker'], 'userId'>;
};

export type RegisterWorkerOutput = {
  worker: Worker;
  skills: Skill[];
  slots: Slot[];
  recommendations: Recommendation[];
};
