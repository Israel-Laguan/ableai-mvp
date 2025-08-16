import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Repositories } from '../../../../domain';

import { APP_ROLE } from '@models/shared';
import { Infra as SharedInfra } from '../../../../../shared';
import { gigWorkTeams } from '../../schemas';
import { makeIsGigWorkTeamGigWorkOwnerClause, makeIsGigWorkTeamWorkerClause } from './shared';
import { GigWorkTeam } from '@models/gig';

const selectSql = SharedInfra.Drizzle.Utils.makeSelectSql(gigWorkTeams);

export function makeGetOneGigWorkTeam(db: NodePgDatabase): Repositories.GetOneGigWorkTeam {
  return async ({ appRole, id, userId }) => {
    const whereClauses = [sql`${gigWorkTeams.id} = ${id}`];

    if (appRole === APP_ROLE.BUYER) {
      whereClauses.push(makeIsGigWorkTeamGigWorkOwnerClause(userId));
    } else if (appRole === APP_ROLE.WORKER) {
      whereClauses.push(makeIsGigWorkTeamWorkerClause(userId));
    } else {
      return null;
    }

    const query = sql`
    ${selectSql}
    FROM ${gigWorkTeams}
    WHERE ${sql.join(whereClauses, sql` AND `)}
    `;

    const gigWorkTeam = await db.execute<Record<keyof GigWorkTeam, GigWorkTeam[keyof GigWorkTeam]>>(
      query
    );

    const rows = gigWorkTeam.rows;

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as GigWorkTeam;
  };
}
