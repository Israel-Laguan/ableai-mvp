import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Repositories } from '../../../../domain';

import type { GigWork } from '@models/gig';

import { APP_ROLE } from '@models/shared';
import { Constants as GigModelConstants } from '@models/gig';
import { Infra as SharedInfra } from '../../../../../shared';
import { Constants } from '../../../../domain';
import { gigWorks } from '../../schemas';
import { makeIsGigWorkOwnerClause, makeIsNotGigWorkOwnerClause } from './shared';

type ValidGigWorksSortFields = (typeof Constants.VALID_GIG_WORK_SORT_FIELDS)[number];

const selectSql = SharedInfra.Drizzle.Utils.makeSelectSql<GigWork>(gigWorks);

export function makeGetAllGigWorks(db: NodePgDatabase): Repositories.GetAllGigWorks {
  return async ({ appRole, userId, limit = 10, offset = 0, sort = 'asc:createdAt', status }) => {
    let sortField: ValidGigWorksSortFields = 'createdAt';
    let sortOrder: 'ASC' | 'DESC' = 'ASC';
    const whereClause = [];

    if (appRole === APP_ROLE.WORKER) {
      whereClause.push(makeIsNotGigWorkOwnerClause(userId));
    } else {
      whereClause.push(makeIsGigWorkOwnerClause(userId));
    }

    if (status === GigModelConstants.GIG_WORK_STATUS.PENDING) {
      whereClause.push(sql`${gigWorks.startDate} > CURRENT_DATE`);
    }

    if (status === GigModelConstants.GIG_WORK_STATUS.IN_PROGRESS) {
      whereClause.push(sql`${gigWorks.startDate} <= CURRENT_DATE`);
      whereClause.push(sql`${gigWorks.endDate} >= CURRENT_DATE`);
    }

    if (status === GigModelConstants.GIG_WORK_STATUS.COMPLETED) {
      whereClause.push(sql`${gigWorks.endDate} < CURRENT_DATE`);
    }

    const whereSql = SharedInfra.Drizzle.Utils.makeWhereSql(whereClause);

    const [newSortOrder, newSortField] = sort?.split(':') ?? [];

    if (
      newSortField &&
      Constants.VALID_GIG_WORK_SORT_FIELDS.includes(newSortField as ValidGigWorksSortFields)
    ) {
      sortField = newSortField as ValidGigWorksSortFields;
    }

    if (newSortOrder.toUpperCase() === 'DESC') {
      sortOrder = 'DESC';
    }

    const sortBy = sql`${gigWorks[sortField]}`;

    const gigWorksQuery = sql`
      ${selectSql}
      FROM ${gigWorks}
      ${whereSql}
      ORDER BY ${sortBy} ${sql.raw(sortOrder)}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const countQuery = sql`
      SELECT COUNT(*)::int AS total
      FROM ${gigWorks}
      ${whereSql}
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
