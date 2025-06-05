import type {
  FirebaseError,
  FirebaseUserRecord,
  FirebaseCustomToken,
} from '../../../../shared/domain/interfaces';
import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type { VerifyPhoneNumberInputs, VerifyPhoneNumberOutputs } from '../../../domain/interfaces';
import type { VerifyPhoneNumber } from '../../../domain/services';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError, throwNotFoundError } from '../errors';

type FirebaseVerifyPhoneNumberInputs = VerifyPhoneNumberInputs<FirebaseCustomToken>;

type FirebaseVerifyPhoneNumberOutput = VerifyPhoneNumberOutputs<FirebaseCustomToken>;

const { USER_NOT_FOUND, UNKNOWN_ERROR } = FIREBASE_ERROR_CODES;

const ERROR_PATH = 'AUTH_PHONE_VERIFICATION_SERVICE';

const throwNotFoundErrorWithPath = () => throwNotFoundError(ERROR_PATH);

async function startPhoneVerification(
  auth: FirebaseAuthModule,
  { email, phoneNumber }: Omit<FirebaseVerifyPhoneNumberInputs, 'idToken'>
): Promise<FirebaseVerifyPhoneNumberOutput> {
  const idToken = await auth
    .getUserByEmail(email)
    .catch(async (error: unknown) => {
      if ((error as FirebaseError)?.code === USER_NOT_FOUND) {
        throwNotFoundErrorWithPath();
      } else {
        throwError(UNKNOWN_ERROR, ERROR_PATH);
      }
    })
    .then(async user => {
      return await auth
        .createCustomToken((user as FirebaseUserRecord).uid, {
          phoneNumber,
          action: 'link_phone',
        })
        .catch(() => throwError(UNKNOWN_ERROR, ERROR_PATH));
    });

  return { email: '', phoneNumber: '', verified: false, idToken };
}

async function verifyPhoneNumber(
  auth: FirebaseAuthModule,
  { idToken }: Pick<FirebaseVerifyPhoneNumberInputs, 'idToken'>
): Promise<FirebaseVerifyPhoneNumberOutput> {
  const { email, phoneNumber } = await auth
    .verifyIdToken(idToken)
    .then(async ({ email, phone_number, email_verified }) => {
      if (email && phone_number && email_verified) {
        return { email, phoneNumber: phone_number };
      } else {
        return throwNotFoundErrorWithPath();
      }
    });

  return { idToken: '', email, phoneNumber, verified: true };
}

/**
 * Service to handle phone number verification using Firebase.
 * It facilitates starting the phone verification process by providing an email and phone number,
 * and also allows for verifying the phone number using an ID token.
 *
 * This service must be exposed via a **protected route**, as it requires prior authentication (e.g., a Firebase Custom Token).
 */
export function makeFirebasePhoneVerificationService({
  auth,
}: {
  auth: FirebaseAuthModule;
}): VerifyPhoneNumber<FirebaseCustomToken, FirebaseCustomToken> {
  return async ({ email, idToken, phoneNumber }) => {
    if (idToken) {
      return await verifyPhoneNumber(auth, { idToken });
    }

    if (email && phoneNumber) {
      return await startPhoneVerification(auth, { email, phoneNumber });
    }

    return { email: '', phoneNumber: '', verified: false, idToken: '' };
  };
}
