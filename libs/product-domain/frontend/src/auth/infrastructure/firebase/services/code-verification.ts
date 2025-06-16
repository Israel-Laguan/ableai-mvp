import type { FirebaseError } from 'firebase/app';

import { getIdToken } from 'firebase/auth';

import type {
  MakeVerifyPhoneVerificationCodeServiceConfig,
  VerifyPhoneVerificationCodeInput,
} from '../types';

import {
  PHONE_VERIFICATION_OUTPUT_CODES,
  PHONE_VERIFICATION_OUTPUT_MESSAGE,
} from '../../../domain/constants';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';

const { INVALID_VERIFICATION_CODE, VERIFICATION_CODE_EXPIRED } = FIREBASE_ERROR_CODES;

const { ERROR, PHONE_VERIFIED, VERIFYING_CODE } = PHONE_VERIFICATION_OUTPUT_CODES;

const {
  GENERIC_ERROR_MESSAGE,
  INVALID_VERIFICATION_CODE_MESSAGE,
  VERIFYING_CODE_MESSAGE,
  VERIFICATION_SUCCESS_MESSAGE,
} = PHONE_VERIFICATION_OUTPUT_MESSAGE;

export function makeVerifyPhoneNumberService({
  cb,
  verifyPhoneNumberBackendUrl,
}: MakeVerifyPhoneVerificationCodeServiceConfig) {
  return async ({
    confirmationResult,
    recaptchaVerifier,
    verificationCode,
  }: VerifyPhoneVerificationCodeInput): Promise<void> => {
    const code = verificationCode.trim();

    if (code?.length !== 6) {
      cb({
        message: INVALID_VERIFICATION_CODE_MESSAGE,
        type: INVALID_VERIFICATION_CODE,
      });
      return;
    }

    if (!confirmationResult) {
      cb({
        message: GENERIC_ERROR_MESSAGE,
        type: ERROR,
      });
      return;
    }

    cb({ message: VERIFYING_CODE_MESSAGE, type: VERIFYING_CODE });

    try {
      const { user } = await confirmationResult.confirm(code);

      const idToken = await getIdToken(user);

      const response = await fetch(verifyPhoneNumberBackendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        cb({
          message: GENERIC_ERROR_MESSAGE,
          type: ERROR,
        });
      }

      cb({
        message: VERIFICATION_SUCCESS_MESSAGE,
        type: PHONE_VERIFIED,
      });

      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    } catch (error) {
      if ((error as FirebaseError).code) {
        if ((error as FirebaseError).code === INVALID_VERIFICATION_CODE) {
          cb({
            message: INVALID_VERIFICATION_CODE_MESSAGE,
            type: INVALID_VERIFICATION_CODE,
          });
        } else if ((error as FirebaseError).code === VERIFICATION_CODE_EXPIRED) {
          cb({
            message: INVALID_VERIFICATION_CODE_MESSAGE,
            type: VERIFICATION_CODE_EXPIRED,
          });
        }
      }

      cb({
        message: GENERIC_ERROR_MESSAGE,
        type: ERROR,
      });
    }
  };
}
