import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { PrivateDataUser } from '@models/auth';
import type { Repositories } from '../../../domain';
import { Infra } from '../../../../shared';
import { privateDataUser } from '../schemas';
import { sql } from 'drizzle-orm';

export const makeDrizzlePrivateUserDataRepository: Repositories.PrivateDataUserRepositoryMaker<
  NodePgDatabase
> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<PrivateDataUser>({
    db,
    schema: privateDataUser,
  });

  return {
    ...repository,

    async findNearUsers(id, distanceInKm = 10, location): Promise<PrivateDataUser[]> {
      const FROM_CLAUSE = privateDataUser;

      let referencePointClause;

      if (location) {
        referencePointClause = sql`(SELECT ST_MakePoint(${location.longitude}, ${location.latitude})::geography)`;
      } else {
        referencePointClause = sql`(SELECT ST_MakePoint(longitude, latitude)::geography FROM ${FROM_CLAUSE} WHERE id = ${id})`;
      }

      const result = await db.execute(
        sql`SELECT * FROM ${FROM_CLAUSE}
            WHERE ST_DWithin(
              ST_MakePoint(longitude, latitude)::geography,
              ${referencePointClause},
              ${distanceInKm * 1000}
            )`
      );

      return result.rows as unknown as PrivateDataUser[];
    },
  };
};
