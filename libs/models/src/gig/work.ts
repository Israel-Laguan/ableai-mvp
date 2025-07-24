import type { IBase } from '../shared';
import type { Constants } from '.';

export interface GigWork extends IBase {
  additionalInstructions?: string;
  address: string;
  buyerId: number;
  description: string;
  endDate: Date;
  latitude: number;
  longitude: number;
  paymentPerHour: number;
  skills: string;
  startDate: Date;
  title: string;
}

type GigWorkStatus = keyof typeof Constants.GIG_WORK_TEAM_STATUS;

export interface GigWorkTeam extends IBase {
  awardedBadge?: string;
  delegateTo?: string;
  endDateOffer: Date;
  endGig: boolean;
  expenses: number;
  feedback?: string;
  gigWorkId: number;
  isAcceptedOffer: boolean;
  paymentId?: number;
  skillId: number;
  status: GigWorkStatus;
  tips?: number;
  totalPayment: number;
  workerId: number;
  workTime: number;
  wouldWork: boolean;
}
