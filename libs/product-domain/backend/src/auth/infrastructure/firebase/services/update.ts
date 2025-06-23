import type { FirebaseError } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { RunInUpdate } from '../../../domain/services';
import type { FirebaseUpdateInput } from '../types';

import { Utils } from '@shared';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError, throwInvalidCredentialsError } from '../errors';

const { INVALID_CREDENTIALS } = FIREBASE_ERROR_CODES;
const ERROR_PATH = 'AUTH_REGISTER_SERVICE';

export function makeFirebaseUpdateService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): RunInUpdate<FirebaseUpdateInput> {
  return async ({ idTokenClaims, user, privateDataUser }) => {
    const { uid } = idTokenClaims;

    const { id } = user;

    if (!id) {
      throwInvalidCredentialsError(ERROR_PATH);
    }

    const { phoneNumber } = privateDataUser || {};

    const updateRequestObj = Utils.removeFalsyEntries({
      phoneNumber,
    });

    if (updateRequestObj) {
      await auth.updateUser(uid, updateRequestObj).catch(async (error: FirebaseError) => {
        if (error.code === INVALID_CREDENTIALS) {
          return null;
        } else {
          return throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH);
        }
      });
    }

    return {
      async rollback() {
        await auth.updateUser(uid, idTokenClaims).catch((error: FirebaseError) => {
          throwError(error.code as FIREBASE_ERROR_CODES, ERROR_PATH, {
            message: 'Failed to rollback user update',
          });
        });
      },
    };
  };
}
