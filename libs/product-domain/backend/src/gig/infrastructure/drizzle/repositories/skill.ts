import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { WorkerSkill } from '@models/gig';
import type { WorkerSkillRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { workerSkills } from '../schemas';

export const makeDrizzleWorkerSkillRepository: WorkerSkillRepositoryMaker<NodePgDatabase> = ({
  db,
}) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<WorkerSkill>({
    db,
    schema: workerSkills,
  });

  return {
    ...repository,
  };
};
