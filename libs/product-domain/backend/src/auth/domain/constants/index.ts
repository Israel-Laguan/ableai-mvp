import { USER_STATUS } from '@models/auth';

export enum AUTH_DICTIONARY {
  USER_REPOSITORY = 'USER_REPOSITORY',
  PRIVATE_USER_DATA_REPOSITORY = 'PRIVATE_USER_DATA_REPOSITORY',
}

export enum AUTH_ERROR_MESSAGES {
  ACCOUNT_DISABLED_MESSAGE = `account disable.`,
  ALREADY_EXIST_MESSAGE = `User already exists.`,
  COULD_NOT_HASH_MESSAGE = `Could not hash the password.`,
  DISABLED_PERM_MESSAGE = `This account has been disabled. If you believe this is an error, please contact us via Discord with reference ID: `,
  ERROR_MESSAGE = `An error occurred during the authentication process.`,
  GEOLOCATION_ERROR_MESSAGE = `Unable to retrieve geo location.`,
  INVALID_CREDENTIALS_MESSAGE = `Incorrect email or password`,
  PRIVATE_DATA_USER_CREATION_FAILED_MESSAGE = `Could not create the user private data.`,
  USER_CREATION_FAILED_MESSAGE = `Could not create the user.`,
  TO_MANY_ATTEMPTS_MESSAGE = `Your account is temporarily locked due to multiple failed attempts. Please try again in 15 minutes or reset your password.`,
}

export enum LOGIN_STATUS_CODE {
  DISABLED_PERM = USER_STATUS.DISABLED_PERM,
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  NOT_VERIFIED = USER_STATUS.NOT_VERIFIED,
  TO_MANY_ATTEMPTS = USER_STATUS.TO_MANY_ATTEMPTS,
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export enum REGISTER_STATUS_CODE {
  ALREADY_EXIST = 'ALREADY_EXIST',
  COULD_NOT_HASH = 'COULD_NOT_HASH',
  PRIVATE_DATA_USER_CREATION_FAILED = 'PRIVATE_DATA_USER_CREATION_FAILED',
  USER_CREATION_FAILED = 'USER_CREATION_FAILED',
}

export type LoginStatusKeys = keyof typeof LOGIN_STATUS_CODE;

export type RegisterStatusKeys = keyof typeof REGISTER_STATUS_CODE;
