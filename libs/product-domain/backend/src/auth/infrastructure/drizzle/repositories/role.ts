import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Role } from '@models/auth';
import type { Repositories } from '../../../domain';

import { Infra } from '../../../../shared';
import { roles } from '../schemas';

export const makeDrizzleRoleRepository: Repositories.RoleRepositoryMaker<NodePgDatabase> = ({
  db,
}) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Role>({
    db,
    schema: roles,
  });

  return {
    ...repository,
  };
};
