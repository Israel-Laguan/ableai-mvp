import type { FirebasePhoneVerificationInput } from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { RunInPhoneVerification } from '../../../domain/services';

import { throwInvalidCredentialsError } from '../errors';

const ERROR_PATH = 'AUTH_PHONE_VERIFICATION_SERVICE';

const throwInvalidCredentialsErrorWithPath = () => throwInvalidCredentialsError(ERROR_PATH);

export function makeFirebasePhoneVerificationService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): RunInPhoneVerification<FirebasePhoneVerificationInput> {
  return async ({ idToken }) => {
    if (idToken) {
      const { email, phoneNumber } = await auth
        .verifyIdToken(idToken)
        .catch(() => {
          return throwInvalidCredentialsErrorWithPath();
        })
        .then(async ({ email, phone_number, email_verified }) => {
          if (email && phone_number && email_verified) {
            return { email, phoneNumber: phone_number };
          } else {
            return throwInvalidCredentialsErrorWithPath();
          }
        });

      return { email, phoneNumber, verified: true };
    }

    return { email: '', phoneNumber: '', verified: false };
  };
}
