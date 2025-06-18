import type { CreateRequest } from 'firebase-admin/lib/auth/auth-config';

import type { FirebaseError, FirebaseUserRecord } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';

import { Utils } from '@shared';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { AUTH_ERROR_MESSAGES } from '../../../domain/constants';
import { RunInRegister } from '../../../domain/services';
import { throwError } from '../errors';

const { INVALID_CREDENTIALS, EMAIL_ALREADY_EXISTS } = FIREBASE_ERROR_CODES;
const { ALREADY_EXIST_MESSAGE, INVALID_PHONE_NUMBER_MESSAGE } = AUTH_ERROR_MESSAGES;
const ERROR_PATH = 'AUTH_REGISTER_SERVICE';

export function makeFirebaseRegisterService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): RunInRegister<Omit<FirebaseUserRecord, 'toJSON'>> {
  return async ({ password, privateDataUser: { email, fullName, phoneNumber }, user: { id } }) => {
    const firebaseUser: FirebaseUserRecord | null = await auth
      .getUserByEmail(email)
      .catch(async (error: FirebaseError) => {
        if (error.code === INVALID_CREDENTIALS) {
          return null;
        } else {
          return throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH);
        }
      });

    if (firebaseUser) {
      throwError(EMAIL_ALREADY_EXISTS, ERROR_PATH, {
        message: ALREADY_EXIST_MESSAGE,
      });
    }

    const userData = Utils.removeFalsyEntries({
      displayName: fullName,
      email,
      password,
      phoneNumber,
      emailVerified: false,
    }) as CreateRequest;

    const newUser = (await auth.createUser(userData).catch((error: FirebaseError) => {
      throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
        message: INVALID_PHONE_NUMBER_MESSAGE,
      });
    })) as FirebaseUserRecord;

    await auth
      .setCustomUserClaims(newUser.uid, { id, roleId: 'user', lastAppRole: null })
      .catch((error: FirebaseError) => {
        throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
          message: 'Failed to set custom user claims',
        });
      });

    return {
      ...newUser,
      async rollback() {
        await auth.deleteUser(newUser.uid).catch((error: FirebaseError) => {
          throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
            message: 'Failed to rollback user creation',
          });
        });
      },
    };
  };
}
