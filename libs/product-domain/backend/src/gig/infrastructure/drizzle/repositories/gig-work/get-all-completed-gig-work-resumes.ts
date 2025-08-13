import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Utils } from '@models/shared';
import { GigWork, Constants } from '@models/gig';
import type { Interfaces, Repositories } from '../../../../domain';

import { Infra as AuthInfra } from '../../../../../auth';
import { Infra as SharedInfra } from '../../../../../shared';
import { gigWorks, gigWorkTeams, workers, workerSkills } from '../../schemas';
import { makeIsGigWorkOwnerClause } from './shared';

const {
  make: {
    select,
    sql: {
      args,
      functions: {
        arrayAgg,
        coalesce,
        sum,
        jsonBuildObject: { JSONBuildObject, makeJSONBuildObjectSchema },
      },
      parts,
      wrap,
    },
  },
} = SharedInfra.Drizzle.Utils.DrizzleSQLFactory;
const { GIG_WORK_TEAM_STATUS } = Constants;
const users = AuthInfra.Drizzle.Schema.users;
const gigWorkAlias = 'gw';
const gigWorkSelectSchema = select<GigWork>(gigWorks, gigWorkAlias);
const gigWorkId = gigWorkSelectSchema.column('id');
const gigWorkCreatedAt = gigWorkSelectSchema.column('createdAt');
const workersAlias = 'workers';
const defaultWorkers = sql.raw(`'{}'`);
const totalPaymentRowAlias = 'totalPayment';
const defaultTotalPayment = sql.raw('0');

const selectPart = sql`
  SELECT ${args(
    gigWorkSelectSchema.columns('*', true),
    coalesce(
      sql`${arrayAgg(sql`
        ${JSONBuildObject(
          sql`${args(
            makeJSONBuildObjectSchema(users).select('uid'),
            makeJSONBuildObjectSchema(workerSkills).selectAll()
          )}`
        )}
     `)}
      FILTER (WHERE ${users.uid} IS NOT NULL)`,
      defaultWorkers,
      workersAlias
    ),
    coalesce(sum(sql`${gigWorkTeams.totalPayment}`), defaultTotalPayment, totalPaymentRowAlias)
  )}`;

const queryCountSelect = sql`
    SELECT COUNT(*)::int AS total
  `;

const fromPart = (userId: number) => {
  return sql`
    FROM ${wrap(
      sql`
      SELECT * 
      FROM ${gigWorks}
      WHERE ${parts(
        sql`${gigWorks.endDate} < CURRENT_DATE`,
        sql`AND ${makeIsGigWorkOwnerClause(userId)}`
      )}`,
      gigWorkAlias
    )}
  `;
};

const joinPart = sql`
  RIGHT JOIN ${gigWorkTeams} ON ${gigWorkTeams.gigWorkId} = ${gigWorkId}
  LEFT JOIN ${workerSkills} ON ${workerSkills.workerId} = ${gigWorkTeams.workerId}
  LEFT JOIN ${workers} ON ${workers.id} = ${gigWorkTeams.workerId}
  LEFT JOIN ${users} ON ${users.id} = ${workers.userId}
  `;

const wherePart = sql`
  WHERE ${gigWorkTeams.status} = ${sql.raw(`'${GIG_WORK_TEAM_STATUS.PAID}'`)}`;

const groupByPart = sql`
  GROUP BY ${args(gigWorkSelectSchema.columns('*'))}
`;

const orderByPart = sql`
  ORDER BY ${gigWorkCreatedAt} DESC
`;

const limitPart = (limit = 10) => sql`
  LIMIT ${limit}
`;

const offsetPart = (offset = 0) => sql`
  OFFSET ${offset}
`;

export function makeGetAllCompletedGigWorkResumes(
  db: NodePgDatabase
): Repositories.GetAllCompletedGigWorksResumes {
  return async ({ limit = 10, offset = 0, userId }) => {
    const query = parts(
      selectPart,
      fromPart(userId),
      joinPart,
      wherePart,
      groupByPart,
      orderByPart,
      limitPart(limit),
      offsetPart(offset)
    );

    const queryCount = sql`
      SELECT COUNT(*)::int AS total 
      FROM (${parts(
        queryCountSelect,
        fromPart(userId),
        joinPart,
        wherePart,
        groupByPart
      )}) AS subquery`;

    const [queryResult, queryCountResult] = await Promise.all([
      db.execute<Utils.InterfaceToRecord<Interfaces.CompletedGigWorkResumes>>(query),
      db.execute<{ total: number }>(queryCount),
    ]);

    const currentPage = Math.floor(offset / limit) + 1;
    const results = queryResult.rows;
    const total = queryCountResult.rows[0].total ?? 0;
    const totalPages = Math.ceil(total / limit);

    return {
      currentPage,
      results,
      total,
      totalPages,
    };
  };
}
