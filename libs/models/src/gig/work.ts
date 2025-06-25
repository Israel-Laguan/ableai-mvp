import { IBase } from '../shared';

export interface GigWork extends IBase {
  address: string;
  buyerId: number;
  description: string;
  endDate: Date;
  paymentPerHour: number;
  startDate: Date;
  title: string;
}

export interface GigWorkTeam extends IBase {
  awardedBadge?: string;
  delegateTo: number; // id
  endDateOffer: Date;
  endGig?: boolean; // false
  feedback?: string;
  gigWorkId: number;
  isAcceptedOffer: boolean; // false
  paymentId: number;
  skillId: number;
  tips?: number;
  totalPayment: number;
  workerId: number;
  workTime: Date;
  wouldWork: boolean;
}
