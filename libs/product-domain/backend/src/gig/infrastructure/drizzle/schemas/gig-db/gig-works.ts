import * as p from 'drizzle-orm/pg-core';

import type { GigWork } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const gigWorks = Schemas.withBaseSchema<GigWork>('gig_works', {
  additionalInstructions: p.varchar('additional_instructions'),
  address: p.varchar('address').notNull(),
  buyerId: p.integer('buyer_id').notNull(),
  description: p.varchar('description').notNull(),
  endDate: p.timestamp('end_date').notNull(),
  latitude: p.doublePrecision('latitude').notNull(),
  longitude: p.doublePrecision('longitude').notNull(),
  paymentPerHour: p.numeric('payment_per_hour', { mode: 'number' }).notNull(),
  skills: p.text('skills').notNull(),
  startDate: p.timestamp('start_date').notNull(),
  title: p.varchar('title').notNull(),
});
