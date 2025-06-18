import type { UpdateRequest } from 'firebase-admin/lib/auth/auth-config';
import type { UserRecord } from 'firebase-admin/lib/auth/user-record';

import type { PrivateDataUser } from '@models/auth';
import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { RunInUpdate } from '../../../domain/services';
import type { FirebaseUpdateInput, FirebaseUpdateOutput } from '../types';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError, throwInvalidCredentialsError } from '../errors';

const { INVALID_CREDENTIALS } = FIREBASE_ERROR_CODES;
const ERROR_PATH = 'AUTH_REGISTER_SERVICE';

export function makeFirebaseUpdateService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): RunInUpdate<FirebaseUpdateInput, FirebaseUpdateOutput> {
  return async ({
    idTokenClaims,
    lastPassword,
    password,
    user: { displayName, id },
    privateDataUser,
  }) => {
    const {
      uid,
      email: lastEmail,
      phone_number: lastPhoneNumber,
      email_verified,
      roleId,
      lastAppRole = null,
    } = idTokenClaims;

    if (!id || !roleId) {
      throwInvalidCredentialsError(ERROR_PATH);
    }

    const userUpdateData: UpdateRequest = {};

    if (displayName) {
      userUpdateData.displayName = displayName;
    }
    if (password && lastPassword) {
      userUpdateData.password = password;
    }

    const { email, phoneNumber } = privateDataUser || ({} as PrivateDataUser);

    if (email) {
      userUpdateData.email = email;
    }
    if (phoneNumber) {
      userUpdateData.phoneNumber = phoneNumber;
    }

    const updatedUser = (await auth
      .updateUser(uid, userUpdateData)
      .catch(async (error: FirebaseError) => {
        if (error.code === INVALID_CREDENTIALS) {
          return null;
        } else {
          return throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH);
        }
      })) as UserRecord;

    const customToken = await auth.createCustomToken(uid, { id, roleId, lastAppRole }).catch(() => {
      return throwInvalidCredentialsError(ERROR_PATH) as never;
    });

    return {
      ...updatedUser,
      customToken,
      async rollback() {
        await auth
          .updateUser(uid, {
            email: lastEmail,
            emailVerified: email_verified,
            password: lastPassword,
            phoneNumber: lastPhoneNumber,
          })
          .catch((error: FirebaseError) => {
            throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
              message: 'Failed to rollback user update',
            });
          });
      },
    };
  };
}
