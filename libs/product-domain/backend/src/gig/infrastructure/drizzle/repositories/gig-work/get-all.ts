import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Repositories } from '../../../../domain';

import type { GigWork } from '@models/gig';

import { Constants } from '../../../../domain';
import { buyers, gigWorks } from '../../schemas';

type ValidGigWorksSortFields = (typeof Constants.VALID_GIG_WORK_SORT_FIELDS)[number];

export function makeGetAllGigWorks(db: NodePgDatabase): Repositories.GetAllGigWorks {
  return async ({ userId, limit = 10, offset = 0, sort }) => {
    const sortField = (sort?.split(':')[1] as ValidGigWorksSortFields) || 'createdAt';
    const sortBy = sql`${gigWorks[sortField]}`;
    const sortOrder = sort?.split(':')[0] === 'desc' ? 'DESC' : 'ASC';

    const query = sql`
      SELECT *
      FROM ${gigWorks}
      WHERE ${gigWorks.buyerId} = (
        SELECT ${buyers.id} FROM ${buyers} WHERE ${buyers.userId} = ${userId}
      )
      ORDER BY ${sortBy} ${sql.raw(sortOrder)}
      LIMIT ${limit} OFFSET ${offset}
    `;

    const queryResult = await db.execute(query);

    const currentPage = Math.floor(offset / limit) + 1;
    const results = queryResult.rows as unknown as GigWork[];
    const total = queryResult.rowCount || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      currentPage,
      results,
      total,
      totalPages,
    };
  };
}
