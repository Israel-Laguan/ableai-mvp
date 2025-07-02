import * as p from 'drizzle-orm/pg-core';

import type { Recommendations } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const recommendations = Schemas.withBaseSchema<Recommendations>('recommendations', {
  isExternal: p.boolean('is_external').default(false),
  name: p.varchar('name').notNull(),
  recommendation: p.varchar('recommendation').notNull(),
  userId: p.integer('user_id'),
  workerId: p.integer('worker_id').notNull(),
});
