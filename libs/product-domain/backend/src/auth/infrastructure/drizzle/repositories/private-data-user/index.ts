import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { PrivateDataUser } from '@models/auth';
import type { Repositories } from '../../../../domain';

import { Infra } from '../../../../../shared';
import { privateDataUser } from '../../schemas';
import { makeGetNearPrivateUserDataIds } from './get-near-private-data-user-ids';

export const makeDrizzlePrivateUserDataRepository: Repositories.PrivateDataUserRepositoryMaker<
  NodePgDatabase
> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<PrivateDataUser>({
    db,
    schema: privateDataUser,
  });

  return {
    ...repository,

    getNearPrivateDataUserIds: makeGetNearPrivateUserDataIds(db),
  };
};
