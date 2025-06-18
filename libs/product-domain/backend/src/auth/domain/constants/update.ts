import type { PrivateDataUser, User } from '@models/auth';
import type { IOmitBase } from '@models/shared';

export const PRIVATE_DATA_USER_UPDATE_ADMITTED_KEYS: (keyof PrivateDataUser)[] = [
  'fullName',
  'email',
  'phoneNumber',
];

export const USER_UPDATE_ADMITTED_KEYS: (keyof Omit<User, IOmitBase>)[] = [
  'avatarUrl',
  'displayName',
  'lastAppRole',
  'lastViewBuyer',
  'lastViewWorker',
];

export type UserUpdateAdmittedKey = (typeof USER_UPDATE_ADMITTED_KEYS)[number];

export const USER_UPDATE_ADMITTED_KEYS_WITH_ID: (UserUpdateAdmittedKey | 'id')[] = [
  'id',
  ...USER_UPDATE_ADMITTED_KEYS,
];

export enum UPDATE_STATUS_CODE {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ERROR_UPDATING_USER = 'ERROR_UPDATING_USER',
}

export type UpdateUserStatusKeys = keyof typeof UPDATE_STATUS_CODE;
