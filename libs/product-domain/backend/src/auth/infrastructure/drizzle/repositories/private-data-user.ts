import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { PrivateDataUser } from '@models/auth';
import type { Repositories } from '../../../domain';
import { Infra } from '../../../../shared';
import { privateDataUser } from '../schemas';

export const makeDrizzlePrivateUserDataRepository: Repositories.PrivateDataUserRepositoryMaker<
  NodePgDatabase
> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<PrivateDataUser>({
    db,
    schema: privateDataUser,
  });

  return {
    ...repository,
  };
};
