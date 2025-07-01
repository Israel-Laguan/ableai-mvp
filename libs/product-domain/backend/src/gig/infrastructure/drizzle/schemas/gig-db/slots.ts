import * as p from 'drizzle-orm/pg-core';

import type { Slot } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const slots = Schemas.withBaseSchema<Slot>('slots', {
  workerId: p.integer('worker_id').notNull(),
  startTime: p.timestamp('start_time').notNull(),
  endTime: p.timestamp('end_time').notNull(),
  isAvailable: p.boolean('is_available').notNull().default(true),
});
