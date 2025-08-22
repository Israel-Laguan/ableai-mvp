import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';
import { match, P } from 'ts-pattern';

import type { GigWorkTeam } from '@models/gig';
import type { Utils } from '@models/shared';
import type { Repositories } from '../../../../domain';

import { Constants } from '@models/gig';
import { APP_ROLE } from '@models/shared';
import { Infra as SharedInfra } from '../../../../../shared';
import { gigWorks, gigWorkTeams } from '../../schemas';
import { makeIsGigWorkTeamGigWorkOwnerClause, makeIsGigWorkTeamWorkerClause } from './shared';
import { Errors } from '@shared';

const PATH = 'UPDATE_STATUS_REPOSITORY_METHOD';

const {
  GIG_WORK_TEAM_STATUS: { ACCEPTED, CANCELLED, COMPLETED, PAID, PENDING, REJECTED, STARTED },
} = Constants;

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

const endGigField = sql.raw(gigWorkTeams.endGig.name);
const isAcceptedOfferField = sql.raw(gigWorkTeams.isAcceptedOffer.name);
const statusField = sql.raw(gigWorkTeams.status.name);

const updatePart = sql`
  UPDATE ${gigWorkTeams}`;

const isPendingWhereClause = sql`${gigWorkTeams.status} = ${PENDING}`;
const isAcceptedWhereClause = sql`${gigWorkTeams.status} = ${ACCEPTED}`;
const isNotCompletedOrPaidWhereClause = sql`${gigWorkTeams.status} NOT IN (${COMPLETED}, ${PAID})`;
const isValidCompletedWhereClause = sql`
  ${gigWorkTeams.status} = ${STARTED} 
  AND NOW() >= (
    SELECT ${gigWorks.endDate}
    FROM ${gigWorks}
    WHERE ${gigWorks.id} = ${gigWorkTeams.gigWorkId}) `;
const isCompletedWhereClause = sql`${gigWorkTeams.status} = ${COMPLETED}`;

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
          .with(ACCEPTED, () => {
            return sql`${isAcceptedOfferField} = ${true}`;
          })
          .with(REJECTED, () => {
            return null;
          })
          .with(CANCELLED, () => {
            return null;
          })
          .with(STARTED, () => {
            return null;
          })
          .with(COMPLETED, () => {
            return sql`${endGigField} = true`;
          })
          .with(PAID, () => {
            return null;
          })
          .with(PENDING, () => {
            return null;
          })
          .exhaustive()
      )}`,

      sql`
      WHERE ${parts(
        sql`${gigWorkTeams.id} = ${id}`,

        match(status)
          .with(P.union(ACCEPTED, REJECTED), () => {
            return sql`
              AND ${gigWorkTeams.createdBy} != ${userId}
              AND ${isPendingWhereClause}`;
          })
          .with(CANCELLED, () => {
            return sql`
              AND ${isNotCompletedOrPaidWhereClause}`;
          })
          .with(STARTED, () => {
            if (appRole === APP_ROLE.BUYER) {
              throw Errors.BadRequestError.create('Buyers cannot update status to STARTED', PATH);
            }

            return sql`
              AND ${isAcceptedWhereClause}`;
          })
          .with(COMPLETED, () => {
            if (appRole === APP_ROLE.BUYER) {
              throw Errors.BadRequestError.create('Buyers cannot update status to COMPLETED', PATH);
            }

            return sql`
              AND ${isValidCompletedWhereClause}`;
          })
          .with(PAID, () => {
            if (appRole === APP_ROLE.WORKER) {
              throw Errors.BadRequestError.create('Workers cannot update status to PAID', PATH);
            }

            return sql`
              AND ${isCompletedWhereClause}`;
          })
          .with(PENDING, () => {
            throw Errors.BadRequestError.create('Cannot update status to PENDING', PATH);
          })
          .exhaustive(),

        sql`AND ${match(appRole)
          .with(APP_ROLE.BUYER, () => {
            return makeIsGigWorkTeamGigWorkOwnerClause(userId);
          })
          .with(APP_ROLE.WORKER, () => {
            return makeIsGigWorkTeamWorkerClause(userId);
          })
          .exhaustive()}`
      )}`,

      returningPart
    );

    const queryResult = await db.execute<Utils.InterfaceToRecord<GigWorkTeam>>(query);

    return queryResult.rows?.[0] || null;
  };
}
