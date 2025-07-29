import type { WorkerSkill } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type WorkerSkillRepository = ISQLCustomRepository<WorkerSkill>;

export type WorkerSkillRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, WorkerSkill>;
