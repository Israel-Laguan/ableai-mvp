import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { getTableConfig } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

import type { Infra } from '@models/gig';
import type { MatchWorkers } from '../../../../domain/repositories';

import { Infra as SharedInfra } from '../../../../../shared';
import { workers, skills as skillSchema, slots } from '../../schemas';

type QueryRow = {
  skill: Infra.MatchedWorker['skill'];
  slots: Infra.MatchedWorker['slots'];
  worker: Infra.MatchedWorker['worker'] & { userId?: number };
};

const {
  Drizzle: {
    Constants: { blankSql },
    Utils: { isNotBlankSQL, makeSQLArray },
  },
} = SharedInfra;

const baseSelect = [
  sql`row_to_json(${sql.raw(`${getTableConfig(skillSchema).name}.*`)}) AS skill`,
  sql`ARRAY_AGG(row_to_json(${sql.raw(`${getTableConfig(slots).name}.*`)})) AS slots`,
  sql`row_to_json(${sql.raw(`${getTableConfig(workers).name}.*`)}) AS worker`,
];

const EQUIPMENT_MATCH_COUNT = sql.raw('equipment_match_count');

const baseOrderBy = [
  sql`${skillSchema.gigsCompleted.name} DESC`,
  sql`${skillSchema.ratePerHour} ASC`,
];

export function makeWorkerMatcher(db: NodePgDatabase): MatchWorkers {
  return async ({
    discardedWorkers,
    gigDate,
    hourlyRate,
    offset = 0,
    skills,
    limit = 5,
    userIds,
    required = [],
  }) => {
    if (userIds.length === 0) {
      return [];
    }

    const sqlDiscardedWorkersArray = discardedWorkers
      ? makeSQLArray(discardedWorkers, 'int')
      : blankSql;
    const sqlGigDate = gigDate ? sql`${gigDate?.toISOString()}` : blankSql;
    const sqlHourlyRate = typeof hourlyRate === 'number' ? sql`${hourlyRate}` : blankSql;
    const sqlRequiredArray = required.length > 0 ? makeSQLArray(required, 'text') : blankSql;
    const sqlSkillsArray = makeSQLArray(skills, 'text');
    const sqlUserIdsArray = makeSQLArray(userIds, 'int');

    const select = baseSelect.concat(
      [
        isNotBlankSQL(sqlRequiredArray)
          ? sql`cardinality(
                    ARRAY(
                      SELECT unnest(string_to_array(${skillSchema.equipment}, ','))
                      INTERSECT
                      SELECT unnest(${sqlRequiredArray})
                    )
                  ) AS ${EQUIPMENT_MATCH_COUNT}`
          : blankSql,
      ].filter(isNotBlankSQL)
    );

    const where = [
      sql`${workers.userId} = ANY(${sqlUserIdsArray})`,
      sql`${skillSchema.name} ILIKE ANY(${sqlSkillsArray})`,
    ].concat(
      [
        isNotBlankSQL(sqlDiscardedWorkersArray)
          ? sql`${workers.id} != ALL(${sqlDiscardedWorkersArray})`
          : blankSql,

        isNotBlankSQL(sqlRequiredArray)
          ? sql`EXISTS (
                SELECT 1 FROM unnest(string_to_array(${skillSchema.equipment}, ',')) AS eq
                WHERE trim(eq) ILIKE ANY(${sqlRequiredArray})
              )`
          : blankSql,

        isNotBlankSQL(sqlHourlyRate)
          ? sql`${skillSchema.ratePerHour} <= ${sqlHourlyRate}`
          : blankSql,

        isNotBlankSQL(sqlGigDate)
          ? sql`${slots.isAvailable} = true 
                  AND ${slots.startTime} <= ${sqlGigDate} 
                  AND ${slots.endTime} >= ${sqlGigDate}`
          : blankSql,
      ].filter(isNotBlankSQL)
    );

    const orderBy = baseOrderBy.concat(
      [isNotBlankSQL(sqlRequiredArray) ? sql`${EQUIPMENT_MATCH_COUNT} DESC` : blankSql].filter(
        isNotBlankSQL
      )
    );

    //TODO: handle skill statistics filter
    const query = sql`
          SELECT ${sql.join(select, sql`, `)}
          FROM ${workers}
          LEFT JOIN ${skillSchema} ON ${skillSchema.workerId} = ${workers.id}
          LEFT JOIN ${slots} ON ${slots.workerId} = ${workers.id}
          WHERE ${sql.join(where, sql` AND `)}
          GROUP BY ${workers.id}, ${skillSchema.id}
          ORDER BY ${sql.join(orderBy, sql`, `)}
          LIMIT ${limit}
          OFFSET ${offset}
        `;

    const queryResult = await db.execute(query);

    const matchedWorkers: Infra.MatchedWorker[] = (queryResult.rows as QueryRow[]).map(row => {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { userId: __, ...newWorker } = row.worker;
      /* eslint-enable @typescript-eslint/no-unused-vars */

      return {
        skill: row.skill,
        slots: row.slots,
        worker: newWorker,
      };
    });

    return matchedWorkers;
  };
}
