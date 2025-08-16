import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Repositories } from '../../../../domain';

import { APP_ROLE } from '@models/shared';
import { Constants, GigWorkTeam } from '@models/gig';
import { gigWorkTeams } from '../../schemas';
import { makeIsGigWorkTeamGigWorkOwnerClause, makeIsGigWorkTeamWorkerClause } from './shared';

export function makeUpdateStatus(db: NodePgDatabase): Repositories.UpdateGigWorkTeamStatus {
  return async ({ appRole, id, status, userId }) => {
    const setClauses = [sql`${sql.raw(gigWorkTeams.status.name)} = ${status}`];

    const whereClauses = [
      sql`${gigWorkTeams.id} = ${id}`,
      sql`${gigWorkTeams.createdBy} != ${userId}`,
    ];

    if (status === Constants.GIG_WORK_TEAM_STATUS.ACCEPTED) {
      setClauses.push(sql`${sql.raw(gigWorkTeams.isAcceptedOffer.name)} = ${true}`);
      whereClauses.push(sql`${gigWorkTeams.status} = ${Constants.GIG_WORK_TEAM_STATUS.PENDING}`);
    }

    if (status === Constants.GIG_WORK_TEAM_STATUS.REJECTED) {
      whereClauses.push(sql`${gigWorkTeams.status} = ${Constants.GIG_WORK_TEAM_STATUS.PENDING}`);
    }

    if (appRole === APP_ROLE.BUYER) {
      whereClauses.push(makeIsGigWorkTeamGigWorkOwnerClause(userId));
    } else if (appRole === APP_ROLE.WORKER) {
      whereClauses.push(makeIsGigWorkTeamWorkerClause(userId));
    } else {
      return null;
    }

    const query = sql`
        UPDATE ${gigWorkTeams}
        SET ${sql.join(setClauses, sql`, `)}
        WHERE ${sql.join(whereClauses, sql` AND `)}
        RETURNING *
      `;

    const queryResult = await db.execute(query);

    return (queryResult.rows?.[0] as unknown as GigWorkTeam) || null;
  };
}
