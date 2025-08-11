import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Infra } from '@models/gig';
import type { Utils } from '@models/shared';
import type { MatchWorkers } from '../../../../domain/repositories';

import { Infra as SharedInfra } from '../../../../../shared';
import { workers, workerSkills as workerSkillSchema, slots } from '../../schemas';

const {
  Drizzle: {
    Constants: { blankSql },
    Utils: {
      DrizzleSQLFactory: {
        make: {
          sql: {
            functions: {
              arrayAgg,
              jsonBuildObject: { JSONBuildObject, makeJSONBuildObjectSchema },
            },
          },
        },
      },
      isNotBlankSQL,
      makeSQLArray,
    },
  },
} = SharedInfra;

const baseSelect = [
  JSONBuildObject(makeJSONBuildObjectSchema(workers).selectAll(), 'worker'),
  JSONBuildObject(makeJSONBuildObjectSchema(workerSkillSchema).selectAll(), 'workerSkill'),
  arrayAgg(sql`${JSONBuildObject(makeJSONBuildObjectSchema(slots).selectAll())}`, 'slots'),
];

const EQUIPMENT_MATCH_COUNT = sql.raw('equipment_match_count');

const baseOrderBy = [
  sql`${workerSkillSchema.gigsCompleted.name} DESC`,
  sql`${workerSkillSchema.ratePerHour} ASC`,
  sql`${workerSkillSchema.responseRate} ASC`,
  sql`${workerSkillSchema.wouldWork} DESC`,
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

    const isValidDiscardedWorkers = discardedWorkers && discardedWorkers.length > 0;

    const sqlDiscardedWorkersArray = isValidDiscardedWorkers
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
                      SELECT unnest(string_to_array(${workerSkillSchema.equipment}, ','))
                      INTERSECT
                      SELECT unnest(${sqlRequiredArray})
                    )
                  ) AS ${EQUIPMENT_MATCH_COUNT}`
          : blankSql,
      ].filter(isNotBlankSQL)
    );

    const where = [
      sql`${workers.userId} = ANY(${sqlUserIdsArray})`,
      sql`${workerSkillSchema.name} ILIKE ANY(${sqlSkillsArray})`,
    ].concat(
      [
        isNotBlankSQL(sqlDiscardedWorkersArray)
          ? sql`${workers.id} != ALL(${sqlDiscardedWorkersArray})`
          : blankSql,

        isNotBlankSQL(sqlRequiredArray)
          ? sql`EXISTS (
                SELECT 1 FROM unnest(string_to_array(${workerSkillSchema.equipment}, ',')) AS eq
                WHERE trim(eq) ILIKE ANY(${sqlRequiredArray})
              )`
          : blankSql,

        isNotBlankSQL(sqlHourlyRate)
          ? sql`${workerSkillSchema.ratePerHour} <= ${sqlHourlyRate}`
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

    const query = sql`
          SELECT ${sql.join(select, sql`, `)}
          FROM ${workers}
          LEFT JOIN ${workerSkillSchema} ON ${workerSkillSchema.workerId} = ${workers.id}
          LEFT JOIN ${slots} ON ${slots.workerId} = ${workers.id}
          WHERE ${sql.join(where, sql` AND `)}
          GROUP BY ${workers.id}, ${workerSkillSchema.id}
          ORDER BY ${sql.join(orderBy, sql`, `)}
          LIMIT ${limit}
          OFFSET ${offset}
        `;

    const queryResult = await db.execute<
      Utils.InterfaceToRecord<Infra.MatchedWorker & { worker: { userId: number } }>
    >(query);

    const matchedWorkers: Infra.MatchedWorker[] = queryResult.rows.map(row => {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { userId: __, ...newWorker } = row.worker;
      /* eslint-enable @typescript-eslint/no-unused-vars */

      return {
        workerSkill: row.workerSkill,
        slots: row.slots,
        worker: newWorker,
      };
    });

    return matchedWorkers;
  };
}
