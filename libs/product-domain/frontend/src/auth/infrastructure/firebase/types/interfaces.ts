import type { Auth, ConfirmationResult, RecaptchaVerifier, User } from 'firebase/auth';
import { SendPhoneVerificationSmsCallback } from '../../../domain/services';

import type { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';

export interface MakeSendPhoneVerificationSmsServiceConfig {
  auth: Auth;
  currentUser: null | User;
  phoneNumber: null | string;
  recaptchaContainer: HTMLElement | string;
  recaptchaVerifier: null | RecaptchaVerifier;

  cb: SendPhoneVerificationSmsCallback<
    never,
    FIREBASE_ERROR_CODES,
    { confirmationResult?: ConfirmationResult; recaptchaVerifier?: RecaptchaVerifier }
  >;
}

export interface MakeVerifyPhoneVerificationCodeServiceConfig {
  auth: Auth;
  verifyPhoneNumberBackendUrl: string;

  cb: SendPhoneVerificationSmsCallback<never, FIREBASE_ERROR_CODES, object>;
}

export interface SendPhoneVerificationSmsInput {
  currentUser: null | User;
  phoneNumber: null | string;
  recaptchaVerifier: null | RecaptchaVerifier;
}

export interface VerifyPhoneVerificationCodeInput {
  confirmationResult: null | ConfirmationResult;
  currentUser: null | User;
  recaptchaVerifier: null | RecaptchaVerifier;
  verificationCode: string;
}
