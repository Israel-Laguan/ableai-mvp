import { APP_ROLE_TYPE, IBase } from '../shared';

export interface User extends IBase {
  isBuyerAllowed: boolean;
  isKycApproved: boolean;
  isPublicProfile: boolean;
  isRtwApproved: boolean;
  isWorkerAllowed: boolean;
  privateDataUserId: number;
  roleId: number;
  socialMediaUrl?: string;
  uid: string;
  withoutPrivateData: boolean;
}

export type UserClaims = Pick<User, 'id' | 'roleId'> & { appRole: APP_ROLE_TYPE };
