import { PHONE_VERIFICATION_OUTPUT_CODES, PHONE_VERIFICATION_OUTPUT_MESSAGE } from '../constants';
import { SendPhoneVerificationSmsCallback } from '../services';

export type SendPhoneVerificationSmsInput<
  CustomInput extends object = object,
  ExtendedOutputMessages = string,
  ExtendedOutputTypes = string,
  CustomOutput extends object = object
> = {
  cb: SendPhoneVerificationSmsCallback<ExtendedOutputMessages, ExtendedOutputTypes, CustomOutput>;
} & CustomInput;

export type SendPhoneVerificationSmsOutput<
  ExtendedOutputMessages = string,
  ExtendedOutputTypes = string,
  CustomOutput extends object = object
> = {
  message: PHONE_VERIFICATION_OUTPUT_MESSAGE | ExtendedOutputMessages;
  type: PHONE_VERIFICATION_OUTPUT_CODES | ExtendedOutputTypes;
} & CustomOutput;
