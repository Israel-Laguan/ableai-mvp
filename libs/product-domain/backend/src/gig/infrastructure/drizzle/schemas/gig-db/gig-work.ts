import * as p from 'drizzle-orm/pg-core';

import type { GigWork } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const gigWorks = Schemas.withBaseSchema<GigWork>('gig_work', {
  address: p.varchar('address'),
  buyerId: p.integer('buyer_id').notNull(),
  description: p.varchar('description'),
  endDate: p.timestamp('end_date'),
  paymentPerHour: p.numeric('payment_per_hour', { mode: 'number' }),
  startDate: p.timestamp('start_date'),
  title: p.varchar('title').notNull(),
});
