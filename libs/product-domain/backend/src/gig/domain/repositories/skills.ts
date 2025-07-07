import type { Skill } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type SkillRepository = ISQLCustomRepository<Skill>;

export type SkillRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Skill>;
