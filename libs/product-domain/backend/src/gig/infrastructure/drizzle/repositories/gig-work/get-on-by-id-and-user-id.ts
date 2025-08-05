import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { GigWork } from '@models/gig';
import type { Repositories } from '../../../../domain';

import { Infra as SharedInfra } from '../../../../../shared';
import { buyers, gigWorks } from '../../schemas';

const selectAllClause = SharedInfra.Drizzle.Utils.makeSelectSql(gigWorks);

export function makeGetOneByIdAndUserId(
  db: NodePgDatabase
): Repositories.GetOneGigWorkByIdAndUserId {
  return async (id, userId) => {
    const query = sql`
        ${selectAllClause}
        FROM ${gigWorks}
        WHERE ${gigWorks.id} = ${id}
        AND ${gigWorks.buyerId} = (
          SELECT ${buyers.id} FROM ${buyers} WHERE ${buyers.userId} = ${userId}
        )
        `;
    const gigWork = await db.execute<Record<keyof GigWork, GigWork[keyof GigWork]>>(query);

    const rows = gigWork.rows;

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as GigWork;
  };
}
