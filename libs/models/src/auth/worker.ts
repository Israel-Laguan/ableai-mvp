import { IBase } from '../shared';

export interface Worker extends IBase {
  feedbackSummary?: string;
  slotAvailability?: string; // need refine
  socialNetworkUrl?: string;
  tags?: string;
  userId: number;
}
