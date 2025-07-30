import { WorkerSkill } from '@models/gig';
import { CreateEntityInput } from '@models/shared';

export type RegisterWorkerSkillInput = CreateEntityInput<
  Omit<
    WorkerSkill,
    | 'experienceMonth'
    | 'gigsCompleted'
    | 'responseRate'
    | 'workerId'
    | 'wouldWork'
    | 'badgesAwarded'
  >
>;
