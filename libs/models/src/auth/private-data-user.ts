import { IBase } from '../shared/';

export interface PrivateDataUser extends IBase {
  address?: string;
  kycUrl?: string;
  latitude?: string;
  longitude?: string;
  phoneNumber?: string;
  rwtUrl?: string;
}
