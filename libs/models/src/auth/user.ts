import { IBase } from '../shared/';
import { RTW_KYC_STATUS } from './constants';

export interface PrivateDataUser extends IBase {
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

export enum LAST_APP_ROLE {
  BUYER = 'BUYER',
  WORKER = 'WORKER',
}

export type LAST_APP_ROLE_TYPE = (typeof LAST_APP_ROLE)[keyof typeof LAST_APP_ROLE];

export interface User extends IBase {
  avatarUrl?: string | null;
  displayName?: string | null;
  lastAppRole?: LAST_APP_ROLE_TYPE | null;
  lastViewBuyer?: string | null;
  lastViewWorker?: string | null;
  privateDataUserId: number;
  roleId: number;
  isGigWorker: boolean;
  isBuyer: boolean;
  stripeCustomerId?: string | null;
  stripeConnectAccountId?: string | null;
  rtwStatus?: RTW_KYC_STATUS | null;
  rtwDocumentUrl?: string | null;
  kycStatus?: RTW_KYC_STATUS | null;
  kycDocumentUrl?: string | null;
}
