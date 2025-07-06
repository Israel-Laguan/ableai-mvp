import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Skill } from '@models/gig';
import type { SkillsRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { skills } from '../schemas';

export const makeDrizzleSkillsRepository: SkillsRepositoryMaker<NodePgDatabase> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Skill>({
    db,
    schema: skills,
  });

  return {
    ...repository,
  };
};
