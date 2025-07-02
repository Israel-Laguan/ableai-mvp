import * as p from 'drizzle-orm/pg-core';

import type { Worker } from '@models/auth';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const workers = Schemas.withBaseSchema<Worker>('workers', {
  feedbackSummary: p.varchar('feedback_summary'),
  socialNetworkUrl: p.varchar('social_network_url'),
  tags: p.varchar('tags'),
  userId: p.integer('user_id').notNull().unique(),
});
