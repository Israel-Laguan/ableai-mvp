import { IBase } from '../shared/';

export interface PrivateDataUser extends IBase {
  address?: string;
  kycUrl?: string;
  latitude?: number;
  longitude?: number;
  phoneNumber?: string | null;
  rwtUrl?: string;
}
