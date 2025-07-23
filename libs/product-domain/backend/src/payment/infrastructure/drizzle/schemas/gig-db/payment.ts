import * as p from 'drizzle-orm/pg-core';

import { Constants, Payment } from '@models/payment';

import { Infra } from '../../../../../shared';

export const payments = Infra.Drizzle.Schemas.withBaseSchema<Payment>('payments', {
  entityId: p.integer('entity_id').notNull(),
  entityType: p
    .text('entity_type', {
      enum: [Constants.ENTITY_TYPE.GIG_WORK, Constants.ENTITY_TYPE.GIG_WORK_TEAM],
    })
    .notNull(),
  invoiceUrl: p.text('invoice_url'),
  payId: p.text('pay_id'),
  provider: p.text('provider').notNull(),
  status: p
    .text('status', {
      enum: [
        Constants.PAYMENT_STATUS.CANCELLED,
        Constants.PAYMENT_STATUS.FAILED,
        Constants.PAYMENT_STATUS.PENDING,
        Constants.PAYMENT_STATUS.SUCCESS,
      ],
    })
    .notNull(),
  total: p.numeric('total').notNull(),
  transactionType: p
    .text('transaction_type', {
      enum: [Constants.TRANSACTION_TYPE.INBOUND, Constants.TRANSACTION_TYPE.OUTBOUND],
    })
    .notNull(),
});
