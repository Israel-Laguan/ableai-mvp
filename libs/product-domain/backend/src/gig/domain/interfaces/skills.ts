import { Skill } from '@models/gig';
import { CreateEntityInput } from '@models/shared';

export type RegisterSkillInput = CreateEntityInput<
  Omit<
    Skill,
    | 'experienceMonth'
    | 'gigsCompleted'
    | 'responseRate'
    | 'workerId'
    | 'wouldWork'
    | 'badgesAwarded'
  >
>;
