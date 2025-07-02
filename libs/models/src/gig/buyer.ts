import { IBase } from '../shared';

export interface Buyer extends IBase {
  badgesAwarded?: string;
  businessAddress?: string;
  businessName?: string;
  businessRegistrationNumber?: string;
  businessRole?: string;
  representativeId?: string;
  socialNetworkUrl?: string;
  userId: number;
  videoUrl?: string;
}
