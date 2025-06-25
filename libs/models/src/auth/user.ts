import { APP_ROLE_TYPE, IBase } from '../shared/';

export interface User extends IBase {
  isBuyerAllowed: boolean; // true
  isKycApproved: boolean;
  isPublicProfile: boolean; // true
  isRtwApproved: boolean;
  isWorkerAllowed: boolean; // false
  privateDataUserId: number;
  roleId: number;
  socialMediaUrl?: string;
  uid: string;
}

export type UserClaims = Pick<User, 'id' | 'roleId'> & { appRole: APP_ROLE_TYPE };
