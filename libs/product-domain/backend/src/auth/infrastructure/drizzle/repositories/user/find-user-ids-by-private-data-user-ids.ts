import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Repositories } from '../../../../domain';

import { Infra } from '../../../../../shared';
import { users } from '../../schemas';

type QueryRow = {
  id: number;
};

const {
  Drizzle: {
    Utils: { makeSQLArray },
  },
} = Infra;

export function makeFindUserIdsByPrivateDataUserIds(
  db: NodePgDatabase
): Repositories.FindUserIdsByPrivateDataUserIds {
  return async privateDataUserIds => {
    if (privateDataUserIds.length === 0) {
      return [];
    }
    const sqlPrivateDataUserIdArray = makeSQLArray(privateDataUserIds, 'int');

    const query = sql`
        SELECT ${users.id} FROM ${users}
        WHERE ${users.privateDataUserId} = ANY(${sqlPrivateDataUserIdArray})
      `;

    const queryResult = await db.execute(query);

    return (queryResult.rows as QueryRow[]).map(row => row.id);
  };
}
