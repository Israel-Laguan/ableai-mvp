import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';

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

    async findNearUsers(id, distanceInKm = 10): Promise<PrivateDataUser[]> {
      const result = await db.execute(
        sql`SELECT * FROM ${privateDataUser} 
            WHERE ST_DWithin(
              ST_MakePoint( longitude, latitude )::geography,
              (
                SELECT ST_MakePoint( longitude, latitude)::geography
                FROM ${privateDataUser} WHERE id = ${id}
              ),
            ${distanceInKm * 1000}
            )
          `
      );

      return result.rows as unknown as PrivateDataUser[];
    },
  };
};
