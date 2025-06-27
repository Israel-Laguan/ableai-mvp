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
  delegateTo: number;
  endDateOffer: Date;
  endGig?: boolean;
  feedback?: string;
  gigWorkId: number;
  isAcceptedOffer: boolean;
  paymentId: number;
  skillId: number;
  tips?: number;
  totalPayment: number;
  workerId: number;
  workTime: Date;
  wouldWork: boolean;
}
