import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Repositories } from '../../../../domain';

import type { GigWork } from '@models/gig';

import { Constants } from '../../../../domain';
import { buyers, gigWorks } from '../../schemas';

type ValidGigWorksSortFields = (typeof Constants.VALID_GIG_WORK_SORT_FIELDS)[number];

export function makeGetAllGigWorks(db: NodePgDatabase): Repositories.GetAllGigWorks {
  return async ({ userId, limit = 10, offset = 0, sort }) => {
    const whereClause = sql`
      ${gigWorks.buyerId} = (
        SELECT ${buyers.id} FROM ${buyers} WHERE ${buyers.userId} = ${userId}
      )
    `;
    const sortField = (sort?.split(':')[1] as ValidGigWorksSortFields) || 'createdAt';
    const sortBy = sql`${gigWorks[sortField]}`;
    const sortOrder = sort?.split(':')[0] === 'desc' ? 'DESC' : 'ASC';

    const gigWorksQuery = sql`
      SELECT *
      FROM ${gigWorks}
      WHERE ${whereClause}
      ORDER BY ${sortBy} ${sql.raw(sortOrder)}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const countQuery = sql`
      SELECT COUNT(*)::int AS total
      FROM ${gigWorks}
      WHERE ${whereClause}
    `;

    const [gigWorksQueryResult, countQueryResult] = await Promise.all([
      db.execute<Record<keyof GigWork, GigWork[keyof GigWork]>>(gigWorksQuery),
      db.execute<{ total: number }>(countQuery),
    ]);

    const currentPage = Math.floor(offset / limit) + 1;
    const results = gigWorksQueryResult.rows as GigWork[];
    const total = countQueryResult.rows[0].total ?? 0;
    const totalPages = Math.ceil(total / limit);

    return {
      currentPage,
      results,
      total,
      totalPages,
    };
  };
}
