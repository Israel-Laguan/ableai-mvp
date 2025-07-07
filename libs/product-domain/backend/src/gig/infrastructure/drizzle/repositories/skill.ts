import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Skill } from '@models/gig';
import type { SkillRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { skills } from '../schemas';

export const makeDrizzleSkillsRepository: SkillRepositoryMaker<NodePgDatabase> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Skill>({
    db,
    schema: skills,
  });

  return {
    ...repository,
  };
};
