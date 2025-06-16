import type { Infra } from '@models/auth';
import type { FirebaseError, FirebaseUserRecord } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { AUTH_ERROR_MESSAGES } from '../../../domain/constants';
import { RunInRegister } from '../../../domain/services';
import { throwError } from '../errors';

const { INVALID_CREDENTIALS, EMAIL_ALREADY_EXISTS } = FIREBASE_ERROR_CODES;
const { ALREADY_EXIST_MESSAGE } = AUTH_ERROR_MESSAGES;
const ERROR_PATH = 'AUTH_REGISTER_SERVICE';

export function makeFirebaseRegisterService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): RunInRegister<Omit<FirebaseUserRecord, 'toJSON'>> {
  return async ({ email, fullName, password, phoneNumber }: Infra.RegisterInput) => {
    const user: FirebaseUserRecord | null = await auth
      .getUserByEmail(email)
      .catch(async (error: FirebaseError) => {
        if (error.code === INVALID_CREDENTIALS) {
          return null;
        } else {
          return throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH);
        }
      });

    if (user) {
      throwError(EMAIL_ALREADY_EXISTS, ERROR_PATH, {
        message: ALREADY_EXIST_MESSAGE,
      });
    }

    const newUser = (await auth
      .createUser({
        displayName: fullName,
        email,
        emailVerified: false,
        password,
        phoneNumber,
      })
      .catch((error: FirebaseError) => {
        throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH);
      })) as FirebaseUserRecord;

    return {
      ...newUser,
      async rollback() {
        return auth.deleteUser(newUser.uid).catch((error: FirebaseError) => {
          throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
            message: 'Failed to rollback user creation',
          });
        });
      },
    };
  };
}
