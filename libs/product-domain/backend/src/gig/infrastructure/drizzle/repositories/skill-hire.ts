import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { SkillHire } from '@models/gig';
import type { SkillHireRepositoryMaker } from '../../../domain/repositories';

import { Infra } from '../../../../shared';
import { skillHires } from '../schemas';

export const makeDrizzleSkillHiresRepository: SkillHireRepositoryMaker<NodePgDatabase> = ({
  db,
}) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<SkillHire>({
    db,
    schema: skillHires,
  });

  return {
    ...repository,
  };
};
