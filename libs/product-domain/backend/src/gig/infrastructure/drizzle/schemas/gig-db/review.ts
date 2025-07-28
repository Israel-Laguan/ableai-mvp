import * as p from 'drizzle-orm/pg-core';

import type { Review } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';
import { APP_ROLE } from '@models/shared';

export const reviews = Schemas.withBaseSchema<Review>('reviews', {
  review: p.varchar('review').notNull(),
  userId: p.integer('user_id').notNull(),
  appRole: p.varchar('app_role', { enum: [APP_ROLE.BUYER, APP_ROLE.WORKER] }).notNull(),
});
