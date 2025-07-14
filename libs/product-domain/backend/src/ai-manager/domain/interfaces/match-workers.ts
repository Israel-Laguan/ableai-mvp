import type { Worker, Skill, Statistic, Slot } from '@models/gig';
import type { Location } from '@models/shared';
import type { Repositories as AuthRepositories } from '../../../auth/domain';
import type { Repositories as GigRepositories } from '../../../gig/domain';

export interface MakeMatchWorkersConfig {
  privateDataUserRepository: AuthRepositories.PrivateDataUserRepository;
  skillRepository: GigRepositories.SkillRepository;
  slotRepository: GigRepositories.SlotRepository;
  statisticRepository: GigRepositories.StatisticRepository;
  userRepository: AuthRepositories.UserRepository;
  workerRepository: GigRepositories.WorkerRepository;
}

export interface MatchedWorker {
  skill: Skill;
  slot: Slot[];
  statistic: Omit<Statistic, 'userId'>;
  worker: Omit<Worker, 'userId'>;
}

export interface MatchWorkersInput {
  distanceInKm?: number;
  limit?: number;
  location?: Location;
  skills: string[];
  startDate: Date;
  userId: number;
}
