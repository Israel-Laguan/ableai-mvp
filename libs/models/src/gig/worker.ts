import { IBase } from '../shared';

export interface Worker extends IBase {
  feedbackSummary?: string;
  socialNetworkUrl?: string;
  tags?: string;
  userId: number;
}
