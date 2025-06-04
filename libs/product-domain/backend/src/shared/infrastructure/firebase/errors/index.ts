import type { FirebaseErrorInputs } from '../../../domain/interfaces';

import { Errors, Utils } from '@shared';
import { FIREBASE_ERROR_CODES } from '../../../domain/constants';

const { EMAIL_ALREADY_EXISTS, INVALID_EMAIL, UNAUTHORIZED_CONTINUE_URI, USER_NOT_FOUND } =
  FIREBASE_ERROR_CODES;

const { getCustomOrDefaultMessage } = Utils;

export const { throwError } = Errors.makeErrorRunner<FirebaseErrorInputs>({
  [EMAIL_ALREADY_EXISTS]: ({ message }) =>
    Errors.AlreadyExistError.create(getCustomOrDefaultMessage(message), 'FIREBASE_REGISTER'),

  [INVALID_EMAIL]: ({ message }) =>
    Errors.BadRequestError.create(getCustomOrDefaultMessage(message), 'FIREBASE_REGISTER'),

  [UNAUTHORIZED_CONTINUE_URI]: ({ uri }) =>
    Errors.InternalServerError.create(
      `The continue URL '${uri}' is not authorized.`,
      'FIREBASE_REGISTER'
    ),

  [USER_NOT_FOUND]: ({ message }) =>
    Errors.NotFoundResourceError.create(getCustomOrDefaultMessage(message), 'FIREBASE_REGISTER'),
});
