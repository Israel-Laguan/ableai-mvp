import * as p from 'drizzle-orm/pg-core';

import type { Payment } from '@models/payment';

import { Infra } from '../../../../../shared';

export const payments = Infra.Drizzle.Schemas.withBaseSchema<Payment>('payments', {
  entityId: p.integer('entity_id').notNull(),
  entityType: p.text('entity_type').notNull(),
  invoiceUrl: p.text('invoice_url'),
  payId: p.text('pay_id'),
  provider: p.text('provider').notNull(),
  status: p.text('status').notNull(),
  total: p.numeric('total').notNull(),
  transactionType: p.text('transaction_type').notNull(),
});
