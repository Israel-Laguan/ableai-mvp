import { sql } from 'drizzle-orm';

import { buyers, gigWorks, gigWorkTeams } from '../../../schemas';

const head = sql`
  EXISTS (
  SELECT 1
  FROM ${gigWorks}
  WHERE
    ${gigWorks.id} = ${gigWorkTeams.gigWorkId}
    AND ${gigWorks.buyerId} = (
      SELECT ${buyers.id}
      FROM ${buyers}`;

export function makeIsGigWorkTeamGigWorkOwnerClause(userId: number) {
  const tail = sql`
      WHERE ${buyers.userId} = ${userId}
        )
    )`;

  return sql.join([head, tail]);
}
