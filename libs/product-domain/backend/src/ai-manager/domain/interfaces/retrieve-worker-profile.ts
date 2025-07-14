import type { Worker, Skill } from '@models/gig';
import type { Repositories as GigRepositories } from '../../../gig/domain';

export interface MakeRetrieveWorkerProfileConfig {
  skillRepository: GigRepositories.SkillRepository;
  workerRepository: GigRepositories.WorkerRepository;
}

export interface WorkerProfile {
  worker: Worker;
  skills: Skill[];
}
