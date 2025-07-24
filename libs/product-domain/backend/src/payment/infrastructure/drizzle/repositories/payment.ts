import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Repositories } from '../../../domain';

import { Infra } from '../../../../shared';
import { Schemas } from '..';
import { Payment } from '@models/payment';

export const makeDrizzlePaymentRepository: Repositories.PaymentRepositoryMaker<NodePgDatabase> = ({
  db,
}) => {
  const baseRepository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Payment>({
    db,
    schema: Schemas.GigDb.payments,
  });

  return {
    ...baseRepository,
  };
};
