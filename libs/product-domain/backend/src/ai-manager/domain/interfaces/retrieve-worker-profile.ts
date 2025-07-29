import type { Worker, WorkerSkill } from '@models/gig';
import type { Repositories as GigRepositories } from '../../../gig/domain';

export interface MakeRetrieveWorkerProfileConfig {
  workerSkillRepository: GigRepositories.WorkerSkillRepository;
  workerRepository: GigRepositories.WorkerRepository;
}

export interface WorkerProfile {
  worker: Worker;
  workerSkills: WorkerSkill[];
}
