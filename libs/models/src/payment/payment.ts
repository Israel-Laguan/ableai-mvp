import type { IBase } from '../shared';
import type { ENTITY_TYPE, PAYMENT_STATUS, TRANSACTION_TYPE } from './constants';

type PaymentStatus = keyof typeof PAYMENT_STATUS;

type TransactionType = keyof typeof TRANSACTION_TYPE;

type EntityType = keyof typeof ENTITY_TYPE;

export interface Payment extends IBase {
  entityId: number;
  entityType: EntityType;
  invoiceUrl?: string;
  payId: string;
  provider: string;
  status: PaymentStatus;
  total: number;
  transactionType: TransactionType;
}

export interface PaymentCard {
  provider: string;
  cardNumber: string;
  privateDataUserId: number;
}
