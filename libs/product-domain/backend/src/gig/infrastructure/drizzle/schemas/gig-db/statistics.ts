import * as p from 'drizzle-orm/pg-core';

import type { GigWork } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const statistics = Schemas.withBaseSchema<GigWork>('statistics', {
  address: p.varchar('address'),
  buyerId: p.integer('buyer_id').notNull(),
  description: p.varchar('description').notNull(),
  endDate: p.timestamp('end_date').notNull(),
  paymentPerHour: p.numeric('payment_per_hour', { mode: 'number' }).notNull(),
  startDate: p.timestamp('start_date').notNull(),
  title: p.varchar('title').notNull(),
});
