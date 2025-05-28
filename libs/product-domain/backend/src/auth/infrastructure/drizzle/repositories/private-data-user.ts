import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { PrivateDataUser } from '@models/auth';
import { Infra } from '../../../../shared';
import type { Repositories } from '../../../domain';
import { privateDataUser } from '../schemas';

export const makeDrizzlePrivateUserDataRepository = (
  db: NodePgDatabase
): Repositories.PrivateDataUserRepository => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<PrivateDataUser>({
    em: db,
    schema: privateDataUser,
  });

  return {
    ...repository,

    getByEmail: async (input: { email: string }) => {
      const data = await repository
        .getAll({
          where: {
            fields: [
              {
                field: 'email',
                value: input.email,
              },
            ],
          },
        })
        .then(data => data.results);

      return data.length > 0 ? data[0] : null;
    },
  };
};
