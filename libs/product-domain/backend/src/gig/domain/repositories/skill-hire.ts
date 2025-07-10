import type { SkillHire } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type SkillHireRepository = ISQLCustomRepository<SkillHire>;

export type SkillHireRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, SkillHire>;
