import * as p from 'drizzle-orm/pg-core';

import type { Review } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const reviews = Schemas.withBaseSchema<Review>('reviews', {
  review: p.varchar('review').notNull(),
  userId: p.integer('user_id').notNull(),
});
