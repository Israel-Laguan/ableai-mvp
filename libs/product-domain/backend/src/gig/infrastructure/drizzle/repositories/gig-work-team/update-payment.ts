import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { GigWorkTeam } from '@models/gig';
import type { Utils } from '@models/shared';
import type { Repositories } from '../../../../domain';

import { Infra as SharedInfra } from '../../../../../shared';
import { gigWorkTeams } from '../../schemas';
import { makeIsGigWorkTeamGigWorkOwnerClause } from './shared';

const {
  Drizzle: {
    Utils: {
      DrizzleSQLFactory: {
        make: { select },
      },
    },
  },
} = SharedInfra;

const returningArgs = sql`
  ${select(gigWorkTeams).columns('*', true)}`;

const expensesField = sql.raw(gigWorkTeams.expenses.name);
const totalPaymentField = sql.raw(gigWorkTeams.totalPayment.name);
const tipsField = sql.raw(gigWorkTeams.tips.name);

export function makeUpdatePayment(db: NodePgDatabase): Repositories.UpdateGigWorkTeamPayment {
  return async ({ expenses = 0, id, totalPayment, userId, tips = 0 }) => {
    const query = sql`
      UPDATE ${gigWorkTeams}
        SET ${expensesField} = ${expenses},
            ${totalPaymentField} = ${totalPayment},
            ${tipsField} = ${tips}
      WHERE 
        ${gigWorkTeams.id} = ${id}
        AND ${makeIsGigWorkTeamGigWorkOwnerClause(userId)}
      RETURNING ${returningArgs}
    `;

    const queryResult = await db.execute<Utils.InterfaceToRecord<GigWorkTeam>>(query);

    return queryResult.rows?.[0] || null;
  };
}
