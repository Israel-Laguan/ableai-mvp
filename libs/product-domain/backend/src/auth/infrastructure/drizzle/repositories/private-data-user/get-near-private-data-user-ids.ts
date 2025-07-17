import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Repositories } from '../../../../domain';

import { privateDataUser } from '../../schemas';

type QueryRow = {
  id: number;
};

export function makeGetNearPrivateUserDataIds(
  db: NodePgDatabase
): Repositories.GetNearPrivateDataUserIds {
  return async (latitude, longitude, radius = 10) => {
    const query = sql`
        SELECT ${privateDataUser.id} FROM ${privateDataUser}
          WHERE ST_DWithin(
            ST_MakePoint(${privateDataUser.longitude}, ${privateDataUser.latitude})::geography,
            (SELECT ST_MakePoint(${longitude}, ${latitude})::geography),
            ${radius * 1000}
          )`;

    const queryResult = await db.execute(query);

    return (queryResult.rows as QueryRow[]).map(row => row.id);
  };
}
