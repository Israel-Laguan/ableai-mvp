import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Repositories } from '../../../domain';

import { Infra } from '../../../../shared';
import { Schemas } from '..';
import { PaymentCard } from '@models/payment';

export const makeDrizzlePaymentCardRepository: Repositories.PaymentCardRepositoryMaker<
  NodePgDatabase
> = ({ db }) => {
  const baseRepository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<PaymentCard>({
    db,
    schema: Schemas.PrivateGigDb.paymentCards,
  });

  return {
    ...baseRepository,
  };
};
