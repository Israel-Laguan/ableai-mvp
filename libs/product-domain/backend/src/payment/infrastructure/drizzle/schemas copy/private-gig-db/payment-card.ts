import * as p from 'drizzle-orm/pg-core';

import type { PaymentCard } from '@models/payment';

import { Infra } from '../../../../../shared';

export const paymentCards = Infra.Drizzle.Schemas.withBaseSchema<PaymentCard>('payment_cards', {
  cardNumber: p.varchar('card_number', { length: 4 }).notNull(),
  privateDataUserId: p.integer('private_data_user_id').notNull(),
  provider: p.varchar('provider', { length: 255 }).notNull(),
});
