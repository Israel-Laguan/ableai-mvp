export enum PHONE_VERIFICATION_OUTPUT_CODES {
  ERROR,
  INVALID_PHONE_NUMBER,
  INVALID_VERIFICATION_CODE,
  NO_PHONE_NUMBER,
  NOT_SIGNED_IN,
  PHONE_VERIFIED,
  RECAPTCHA_EXPIRED,
  SENDING_VERIFICATION_CODE,
  VERIFICATION_CODE_EXPIRED,
  VERIFICATION_CODE_SENT,
  VERIFYING_CODE,
}

export enum PHONE_VERIFICATION_OUTPUT_MESSAGE {
  ALREADY_LINKED_MESSAGE = 'Credentials already linked.',
  GENERIC_ERROR_MESSAGE = 'An error occurred while sending the verification code.',
  INVALID_PHONE_NUMBER_MESSAGE = 'Invalid phone number format. Use E.164 format (e.g. +34600123456).',
  INVALID_VERIFICATION_CODE_MESSAGE = 'Invalid verification code. Please try again.',
  NO_PHONE_NUMBER_MESSAGE = 'Please enter a phone number.',
  NOT_SIGNED_IN_MESSAGE = 'You must sign in first.',
  RECAPTCHA_EXPIRED_MESSAGE = 'reCAPTCHA expired. Please try again.',
  SENDING_VERIFICATION_CODE_MESSAGE = 'Requesting verification code...',
  VERIFICATION_CODE_SENT_MESSAGE = 'Verification code sent successfully.',
  VERIFYING_CODE_MESSAGE = 'Verifying code...',
  VERIFICATION_SUCCESS_MESSAGE = 'Phone number verified.',
}
