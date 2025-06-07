import type { FirebaseErrorInputs } from '../../../domain/interfaces';

import { Errors, Utils } from '@shared';
import { FIREBASE_ERROR_CODES } from '../../../domain/constants';

const {
  EMAIL_ALREADY_EXISTS,
  INVALID_EMAIL,
  UNAUTHORIZED_CONTINUE_URI,
  INVALID_CREDENTIALS,
  UNKNOWN_ERROR,
} = FIREBASE_ERROR_CODES;

const { getCustomOrDefaultMessage } = Utils;

export const MakeThrowError = ({ path }: { path: string }) => {
  const firebaseErrorPath = `FIREBASE: ${path}`;

  return Errors.makeErrorRunner<FirebaseErrorInputs, FIREBASE_ERROR_CODES>({
    [EMAIL_ALREADY_EXISTS]: ({ message }) =>
      Errors.AlreadyExistError.create(getCustomOrDefaultMessage(message), firebaseErrorPath),

    [INVALID_EMAIL]: ({ message }) =>
      Errors.BadRequestError.create(getCustomOrDefaultMessage(message), firebaseErrorPath),

    [UNAUTHORIZED_CONTINUE_URI]: ({ uri }) =>
      Errors.InternalServerError.create(
        `The continue URL '${uri}' is not authorized.`,
        firebaseErrorPath
      ),

    [INVALID_CREDENTIALS]: ({ message }) =>
      Errors.NotFoundResourceError.create(getCustomOrDefaultMessage(message), firebaseErrorPath),

    [UNKNOWN_ERROR]: () =>
      Errors.InternalServerError.create(
        'An unknown error occurred while processing the request.',
        firebaseErrorPath
      ),
  }).throwError;
};
