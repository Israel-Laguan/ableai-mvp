import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { type SQL, sql } from 'drizzle-orm';
import { match, P } from 'ts-pattern';

import type { GigWork } from '@models/gig';
import type { Repositories } from '../../../../domain';

import { Constants as GigModelConstants } from '@models/gig';
import { APP_ROLE, type Utils } from '@models/shared';
import { Infra as SharedInfra } from '../../../../../shared';
import { Constants } from '../../../../domain';
import { gigWorks } from '../../schemas';
import { makeIsGigWorkOwnerClause, makeIsNotGigWorkOwnerClause } from './shared';

const { VALID_GIG_WORK_SORT_FIELDS } = Constants;

const {
  Drizzle: {
    Utils: {
      DrizzleSQLFactory: {
        make: {
          select,
          sql: { parts },
        },
      },
    },
  },
} = SharedInfra;

const gigWorkTable = select<GigWork>(gigWorks);

const headPart = sql`
  SELECT ${gigWorkTable.columns('*', true)}
  FROM ${gigWorks}
  WHERE 
`;

type ValidGigWorksSortFields = (typeof VALID_GIG_WORK_SORT_FIELDS)[number];

const validSortFields = Object.fromEntries(
  VALID_GIG_WORK_SORT_FIELDS.map(value => {
    return [value, gigWorkTable.column(value)];
  })
) as Record<ValidGigWorksSortFields, SQL>;

export function makeGetAllGigWorks(db: NodePgDatabase): Repositories.GetAllGigWorks {
  return async ({ appRole, userId, limit = 10, offset = 0, sort = 'asc:createdAt', status }) => {
    const [sortOrder, sortField] = sort?.split(':') ?? [];

    const isGigWorkOwnerOrWorkerPart = match(appRole)
      .with(APP_ROLE.WORKER, () => {
        return makeIsNotGigWorkOwnerClause(userId);
      })
      .otherwise(() => {
        return makeIsGigWorkOwnerClause(userId);
      });

    const gigWorkStatusPart = match(status)
      .with(GigModelConstants.GIG_WORK_STATUS.PENDING, () => {
        return sql`AND ${gigWorks.startDate} > CURRENT_DATE`;
      })
      .with(GigModelConstants.GIG_WORK_STATUS.IN_PROGRESS, () => {
        return sql`
            AND ${gigWorks.startDate} <= CURRENT_DATE
            AND ${gigWorks.endDate} >= CURRENT_DATE
          `;
      })
      .with(GigModelConstants.GIG_WORK_STATUS.COMPLETED, () => {
        return sql`${gigWorks.endDate} < CURRENT_DATE`;
      })
      .otherwise(() => {
        return null;
      });

    const query = parts(
      headPart,
      isGigWorkOwnerOrWorkerPart,
      gigWorkStatusPart,

      sql`ORDER BY `,
      match(sortField)
        .with(
          P.when(sortField => {
            return VALID_GIG_WORK_SORT_FIELDS.includes(sortField as ValidGigWorksSortFields);
          }),
          (sortField: ValidGigWorksSortFields) => {
            return validSortFields[sortField];
          }
        )
        .otherwise(() => validSortFields['createdAt']),
      match(sortOrder.toUpperCase())
        .with('DESC', () => {
          return sql.raw('DESC');
        })
        .otherwise(() => {
          return sql.raw('ASC');
        }),

      sql`
      LIMIT ${limit}
      OFFSET ${offset}
      `
    );

    const countQuery = parts(
      sql`
      SELECT COUNT(*)::int AS total
      FROM ${gigWorks}
      WHERE`,
      isGigWorkOwnerOrWorkerPart,
      gigWorkStatusPart
    );

    const [gigWorksQueryResult, countQueryResult] = await Promise.all([
      db.execute<Utils.InterfaceToRecord<GigWork>>(query),
      db.execute<{ total: number }>(countQuery),
    ]);

    const currentPage = Math.floor(offset / limit) + 1;
    const results = gigWorksQueryResult.rows;
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
