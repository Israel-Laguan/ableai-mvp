import { IBase } from '../shared';

export interface GigWork extends IBase {
  additionalInstructions?: string;
  address: string;
  buyerId: number;
  description: string;
  endDate: Date;
  latitude?: number;
  longitude?: number;
  paymentPerHour: number;
  startDate: Date;
  title: string;
}

export interface GigWorkTeam extends IBase {
  awardedBadge?: string;
  delegateTo: number;
  endDateOffer: Date;
  endGig: boolean;
  expenses: number;
  feedback?: string;
  gigWorkId: number;
  isAcceptedOffer: boolean;
  paymentId: number;
  skillId: number;
  tips?: number;
  totalPayment: number;
  workerId: number;
  workTime: number;
  wouldWork: boolean;
}
