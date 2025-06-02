import { Errors } from '@shared';

interface FirebaseErrorInputs {
  email?: string;
  uri?: string;
}

export const { throwError } = Errors.makeErrorRunner<FirebaseErrorInputs>({
  'auth/email-already-exists': ({ email }) =>
    Errors.AlreadyExistError.create(
      `The email '${email}' is already in use by another account.`,
      'FIREBASE_REGISTER'
    ),

  'auth/invalid-email': ({ email }) =>
    Errors.BadRequestError.create(`The email '${email}' is not valid.`, 'FIREBASE_REGISTER'),

  'auth/user-not-found': ({ email }) =>
    Errors.NotFoundResourceError.create(`User ${email} not found.`, 'FIREBASE_REGISTER'),

  'auth/unauthorized-continue-uri': ({ uri }) =>
    Errors.InternalServerError.create(
      `The continue URL '${uri}' is not authorized.`,
      'FIREBASE_REGISTER'
    ),
});
