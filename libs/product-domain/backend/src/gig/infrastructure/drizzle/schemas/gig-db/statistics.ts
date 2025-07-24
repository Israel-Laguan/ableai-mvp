import * as p from 'drizzle-orm/pg-core';

import type { Statistic } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const statistics = Schemas.withBaseSchema<Statistic>('statistics', {
  appRole: p.varchar('app_role').default('BUYER'),
  responseRate: p.numeric('response_rate', { mode: 'number' }).default(0),
  userId: p.integer('user_id').notNull(),
  wouldWork: p.integer('would_work').default(0),
});
