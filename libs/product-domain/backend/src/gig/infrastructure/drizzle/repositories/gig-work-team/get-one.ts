import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';
import { match } from 'ts-pattern';

import type { GigWorkTeam } from '@models/gig';
import type { Utils } from '@models/shared';
import type { Repositories } from '../../../../domain';

import { APP_ROLE } from '@models/shared';
import { Infra as SharedInfra } from '../../../../../shared';
import { gigWorkTeams } from '../../schemas';
import { makeIsGigWorkTeamGigWorkOwnerClause, makeIsGigWorkTeamWorkerClause } from './shared';

const {
  Drizzle: {
    Utils: {
      DrizzleSQLFactory: {
        make: {
          sql: { parts },
          select,
        },
      },
    },
  },
} = SharedInfra;

const selectPart = sql`
  SELECT ${select(gigWorkTeams).columns('*', true)}`;

const fromPart = sql`
  FROM ${gigWorkTeams}`;

export function makeGetOneGigWorkTeam(db: NodePgDatabase): Repositories.GetOneGigWorkTeam {
  return async ({ appRole, id, userId }) => {
    const query = parts(
      selectPart,
      fromPart,
      sql`WHERE ${gigWorkTeams.id} = ${id}`,
      match(appRole)
        .with(APP_ROLE.BUYER, () => {
          return sql`AND ${makeIsGigWorkTeamGigWorkOwnerClause(userId)}`;
        })
        .with(APP_ROLE.WORKER, () => {
          return sql`AND ${makeIsGigWorkTeamWorkerClause(userId)}`;
        })
        .otherwise(() => {
          return null;
        })
    );

    const gigWorkTeam = await db.execute<Utils.InterfaceToRecord<GigWorkTeam>>(query);

    const rows = gigWorkTeam.rows;

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as GigWorkTeam;
  };
}
