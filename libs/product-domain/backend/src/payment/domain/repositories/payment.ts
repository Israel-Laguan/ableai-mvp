import type { Payment } from '@models/payment';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type PaymentRepository = ISQLCustomRepository<Payment>;

export type PaymentRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Payment>;
