import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';
import { match } from 'ts-pattern';

import type { GigWorkTeam } from '@models/gig';
import type { Utils } from '@models/shared';
import type { Repositories } from '../../../../domain';

import { Constants } from '@models/gig';
import { APP_ROLE } from '@models/shared';
import { Infra as SharedInfra } from '../../../../../shared';
import { gigWorkTeams } from '../../schemas';
import { makeIsGigWorkTeamGigWorkOwnerClause, makeIsGigWorkTeamWorkerClause } from './shared';

const { GIG_WORK_TEAM_STATUS } = Constants;

const {
  Drizzle: {
    Utils: {
      DrizzleSQLFactory: {
        make: {
          select,
          sql: { args, parts },
        },
      },
    },
  },
} = SharedInfra;

const isAcceptedOfferField = sql.raw(gigWorkTeams.isAcceptedOffer.name);
const statusField = sql.raw(gigWorkTeams.status.name);

const updatePart = sql`
  UPDATE ${gigWorkTeams}`;

const isPendingWhereClause = sql`${gigWorkTeams.status} = ${Constants.GIG_WORK_TEAM_STATUS.PENDING}`;

const returningPart = sql`
   RETURNING ${select(gigWorkTeams).columns('*', true)}`;

export function makeUpdateStatus(db: NodePgDatabase): Repositories.UpdateGigWorkTeamStatus {
  return async ({ appRole, id, status, userId }) => {
    const query = parts(
      updatePart,

      sql`
      SET ${args(
        sql`${statusField} = ${status}`,
        match(status)
          .with(GIG_WORK_TEAM_STATUS.ACCEPTED, () => {
            return sql`${isAcceptedOfferField} = ${true}`;
          })
          .otherwise(() => {
            return null;
          })
      )}`,

      sql`
      WHERE 
        ${gigWorkTeams.id} = ${id}
        AND ${gigWorkTeams.createdBy} != ${userId}
        AND ${match(appRole)
          .with(APP_ROLE.BUYER, () => {
            return makeIsGigWorkTeamGigWorkOwnerClause(userId);
          })
          .with(APP_ROLE.WORKER, () => {
            return makeIsGigWorkTeamWorkerClause(userId);
          })
          .exhaustive()}
        AND ${match(status)
          .with(GIG_WORK_TEAM_STATUS.ACCEPTED, () => {
            return isPendingWhereClause;
          })
          .with(GIG_WORK_TEAM_STATUS.REJECTED, () => {
            return isPendingWhereClause;
          })
          .otherwise(() => {
            return sql``;
          })}`,

      returningPart
    );

    const queryResult = await db.execute<Utils.InterfaceToRecord<GigWorkTeam>>(query);

    return queryResult.rows?.[0] || null;
  };
}
