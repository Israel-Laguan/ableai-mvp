import { JSONValue } from '../../shared';
import { IBase } from '../../shared/base';
import { PAYMENT_STATUS } from '../constants';

export interface Payment extends IBase {
  gigId: number;
  payerUserId: number;
  receiverUserId: number;
  amountGross: number;
  ableFeeAmount: number;
  amountNetToWorker: number;
  status: PAYMENT_STATUS;
  invoiceUrl?: string | null;
  isTesting: boolean;
  paymentMethodDetailsJson?: JSONValue | null;
  paidAt?: Date | null;
  refundedAt?: Date | null;
  refundReason?: string | null;
  internalNotes?: string | null;
}

export interface PaymentWithStripe extends Payment {
  stripeFeeAmount: number;
  stripePaymentIntentId?: string | null;
  stripeChargeId?: string | null;
  stripeTransferIdToWorker?: string | null;
  stripePayoutIdToWorker?: string | null;
}

export interface MockPayment extends IBase {
  workerUserId: number;
  buyerUserId: number;
  gigId?: number | null;
  amount: number;
  description?: string | null;
  scenario?: string | null;
}
