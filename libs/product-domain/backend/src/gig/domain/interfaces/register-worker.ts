import type { Worker, WorkerSkill, Slot, Recommendation } from '@models/gig';
import type { CreateEntityInput } from '@models/shared';
import type { Repositories } from '..';
import type { RegisterRecommendationInput, RegisterSkillInput, RegisterSlotInput } from '.';

export interface MakeRegisterWorkerInput {
  workerRepository: Repositories.WorkerRepository;
}

export type RegisterWorkerInput = {
  worker: CreateEntityInput<Omit<Worker, 'feedbackSummary'>>;
  workerSkills: RegisterSkillInput[];
  slots: RegisterSlotInput[];
  recommendations: RegisterRecommendationInput[];
};

export type RegisterWorkerServiceInput = Omit<RegisterWorkerInput, 'workerSkills' | 'worker'> & {
  worker: Omit<RegisterWorkerInput['worker'], 'tags'> & { tags?: string[] };
  workerSkills: (Omit<RegisterWorkerInput['workerSkills'][number], 'equipment'> & {
    equipment?: string[];
  })[];
};

export type RegisterWorkerRequestBody = Omit<RegisterWorkerServiceInput, 'worker'> & {
  worker: Omit<RegisterWorkerServiceInput['worker'], 'userId'>;
};

export type RegisterWorkerOutput = {
  worker: Worker;
  workerSkills: WorkerSkill[];
  slots: Slot[];
  recommendations: Recommendation[];
};
