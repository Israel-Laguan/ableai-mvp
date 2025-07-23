import type { PaymentCard } from '@models/payment';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type PaymentCardRepository = ISQLCustomRepository<PaymentCard>;

export type PaymentCardRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, PaymentCard>;
