import type { FirebaseError } from 'firebase/app';

import { linkWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

import type {
  MakeSendPhoneVerificationSmsServiceConfig,
  SendPhoneVerificationSmsInput,
} from '../types';

import {
  PHONE_VERIFICATION_OUTPUT_CODES,
  PHONE_VERIFICATION_OUTPUT_MESSAGE,
} from '../../../domain/constants';
import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';

const {
  ERROR,
  INVALID_PHONE_NUMBER,
  NOT_SIGNED_IN,
  NO_PHONE_NUMBER,
  RECAPTCHA_EXPIRED,
  SENDING_VERIFICATION_CODE,
  VERIFICATION_CODE_SENT,
} = PHONE_VERIFICATION_OUTPUT_CODES;

const { ALREADY_LINKED } = FIREBASE_ERROR_CODES;

const {
  ALREADY_LINKED_MESSAGE,
  GENERIC_ERROR_MESSAGE,
  INVALID_PHONE_NUMBER_MESSAGE,
  NOT_SIGNED_IN_MESSAGE,
  NO_PHONE_NUMBER_MESSAGE,
  RECAPTCHA_EXPIRED_MESSAGE,
  SENDING_VERIFICATION_CODE_MESSAGE,
  VERIFICATION_CODE_SENT_MESSAGE,
} = PHONE_VERIFICATION_OUTPUT_MESSAGE;

export function makeSendPhoneVerificationSmsService({
  auth,
  cb,
  recaptchaContainer,
}: MakeSendPhoneVerificationSmsServiceConfig) {
  return async ({
    currentUser,
    phoneNumber,
    recaptchaVerifier,
  }: SendPhoneVerificationSmsInput): Promise<void> => {
    if (!currentUser) {
      return cb({ message: NOT_SIGNED_IN_MESSAGE, type: NOT_SIGNED_IN });
    }

    if (!phoneNumber) {
      return cb({ message: NO_PHONE_NUMBER_MESSAGE, type: NO_PHONE_NUMBER });
    }

    const normalizedPhoneNumber = phoneNumber.trim();

    if (!normalizedPhoneNumber.startsWith('+') || normalizedPhoneNumber.length < 10) {
      return cb({
        message: INVALID_PHONE_NUMBER_MESSAGE,
        type: INVALID_PHONE_NUMBER,
      });
    }

    try {
      if (!recaptchaVerifier) {
        recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved.');
          },
          'expired-callback': () => {
            (recaptchaVerifier as RecaptchaVerifier).clear();
            cb({ message: RECAPTCHA_EXPIRED_MESSAGE, type: RECAPTCHA_EXPIRED });
          },
        });

        await recaptchaVerifier.render();
      } else {
        recaptchaVerifier.clear();
        await recaptchaVerifier.render();
      }

      cb({
        message: SENDING_VERIFICATION_CODE_MESSAGE,
        type: SENDING_VERIFICATION_CODE,
      });

      const confirmationResult = await linkWithPhoneNumber(
        currentUser,
        normalizedPhoneNumber,
        recaptchaVerifier
      );

      cb({
        message: VERIFICATION_CODE_SENT_MESSAGE,
        type: VERIFICATION_CODE_SENT,
        confirmationResult,
        recaptchaVerifier,
      });
    } catch (error) {
      if ((error as FirebaseError).code === ALREADY_LINKED) {
        return cb({
          message: ALREADY_LINKED_MESSAGE,
          type: ALREADY_LINKED,
        });
      } else {
        cb({
          message: GENERIC_ERROR_MESSAGE,
          type: ERROR,
        });
      }

      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    }
  };
}
