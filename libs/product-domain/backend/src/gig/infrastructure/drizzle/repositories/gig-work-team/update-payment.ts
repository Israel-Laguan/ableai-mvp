import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { sql } from 'drizzle-orm';

import type { Repositories } from '../../../../domain';

import { GigWorkTeam } from '@models/gig';
import { Infra as SharedInfra } from '../../../../../shared';
import { gigWorkTeams } from '../../schemas';
import { makeIsGigWorkTeamGigWorkOwnerClause } from './shared';

const expensesField = sql.raw(gigWorkTeams.expenses.name);
const totalPaymentField = sql.raw(gigWorkTeams.totalPayment.name);
const tipsField = sql.raw(gigWorkTeams.tips.name);

export function makeUpdatePayment(db: NodePgDatabase): Repositories.UpdateGigWorkTeamPayment {
  return async ({ expenses = 0, id, totalPayment, userId, tips = 0 }) => {
    const set = SharedInfra.Drizzle.Utils.makeSetSql([
      sql`${expensesField} = ${expenses}`,
      sql`${totalPaymentField} = ${totalPayment}`,
      sql`${tipsField} = ${tips}`,
    ]);

    const where = SharedInfra.Drizzle.Utils.makeWhereSql([
      sql`${gigWorkTeams.id} = ${id}`,
      makeIsGigWorkTeamGigWorkOwnerClause(userId),
    ]);

    const query = sql`
      UPDATE ${gigWorkTeams}
      ${set}
      ${where}
      RETURNING *
    `;

    const queryResult = await db.execute(query);

    return (queryResult.rows?.[0] as unknown as GigWorkTeam) || null;
  };
}
