import * as p from 'drizzle-orm/pg-core';

import type { Skill } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const skills = Schemas.withBaseSchema<Skill>('skills', {
  badgesAwarded: p.varchar('badges_awarded'),
  equipment: p.varchar('equipment'),
  experienceMonth: p.integer('experience_month').default(0),
  gigsCompleted: p.integer('gigs_completed').default(0),
  imagesUrl: p.varchar('images_url'),
  name: p.varchar('name').notNull(),
  ratePerHour: p.numeric('rate_per_hour', { mode: 'number' }).default(0),
  summary: p.varchar('summary').notNull(),
  trainingDescription: p.varchar('training_description'),
  videoUrl: p.varchar('video_url'),
  workerId: p.integer('worker_id').notNull(),
  responseRate: p.integer('response_rate').default(0),
  wouldWork: p.integer('would_work').default(0),
});
