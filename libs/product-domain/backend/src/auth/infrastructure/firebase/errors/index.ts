import { AUTH_ERROR_MESSAGES } from '../../../domain/constants';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { Errors } from '../../../../shared/infrastructure/firebase';

const { USER_NOT_FOUND } = FIREBASE_ERROR_CODES;
const { INVALID_CREDENTIALS_MESSAGE } = AUTH_ERROR_MESSAGES;

export const { throwError } = Errors;

export const throwNotFoundError = () =>
  throwError(USER_NOT_FOUND, { message: INVALID_CREDENTIALS_MESSAGE });
