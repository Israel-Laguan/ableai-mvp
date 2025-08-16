import { sql } from 'drizzle-orm';

import { workers, gigWorkTeams } from '../../../schemas';

export function makeIsGigWorkTeamWorkerClause(userId: number) {
  return sql`
    EXISTS (
      SELECT 1
      FROM ${workers}
      WHERE
        ${workers.id} = ${gigWorkTeams.workerId}
        AND ${workers.userId} = ${userId}
    )
  `;
}
