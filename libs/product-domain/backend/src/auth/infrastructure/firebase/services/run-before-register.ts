import type { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { RunBeforeRegister } from '../../../domain/services';
import type { FirebaseAddCustomClaimsDto } from '../types';

import { Utils } from '@shared';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { AUTH_ERROR_MESSAGES } from '../../../domain/constants';
import { throwError } from '../errors';

const { INVALID_CREDENTIALS, EMAIL_ALREADY_EXISTS } = FIREBASE_ERROR_CODES;
const { ALREADY_EXIST_MESSAGE, INVALID_PHONE_NUMBER_MESSAGE } = AUTH_ERROR_MESSAGES;
const ERROR_PATH = 'AUTH_REGISTER_SERVICE';

export function makeRunBeforeRegisterService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): RunBeforeRegister<FirebaseAddCustomClaimsDto> {
  return async ({ password, email, phoneNumber }) => {
    const firebaseUser: UserRecord | null = await auth
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

    const user = Utils.removeFalsyEntries({
      email,
      password,
      phoneNumber,
      emailVerified: false,
    }) as CreateRequest;

    const userRecord = (await auth.createUser(user).catch((error: FirebaseError) => {
      throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
        message: INVALID_PHONE_NUMBER_MESSAGE,
      });
    })) as UserRecord;

    const { uid } = userRecord;

    return {
      userRecord,
      user: { uid },
      async rollback() {
        await auth.deleteUser(uid).catch((error: FirebaseError) => {
          throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
            message: 'Failed to rollback user creation',
          });
        });
      },
    };
  };
}
