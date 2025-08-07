import { sql } from 'drizzle-orm';

import { gigWorks, buyers } from '../../../schemas';

export function makeIsNotGigWorkOwnerClause(userId: number) {
  return sql`
    ${gigWorks.buyerId} != (
              SELECT ${buyers.id} FROM ${buyers} WHERE ${buyers.userId} = ${userId}
            )`;
}
