import { IBase, JSONValue } from '../../../shared';

export interface BuyerProfile extends IBase {
  userId: number;
  fullCompanyName?: string | null;
  vatNumber?: string | null;
  businessRegistrationNumber?: string | null;
  billingAddressJson?: JSONValue | null;
}
