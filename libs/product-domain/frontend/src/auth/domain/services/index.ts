import { SendPhoneVerificationSmsInput, SendPhoneVerificationSmsOutput } from '../interfaces';

export type SendPhoneVerificationSmsCallback<
  ExtendedOutputMessages = string,
  ExtendedOutputTypes = string,
  CustomOutput extends object = object
> = (
  output: SendPhoneVerificationSmsOutput<ExtendedOutputMessages, ExtendedOutputTypes, CustomOutput>
) => Promise<void> | void;

export type SendPhoneVerificationSms<
  CustomInput extends object = object,
  ExtendedOutputMessages = string,
  ExtendedOutputTypes = string,
  CustomOutput extends object = object
> = (
  input: Partial<
    SendPhoneVerificationSmsInput<
      CustomInput,
      ExtendedOutputMessages,
      ExtendedOutputTypes,
      CustomOutput
    >
  >
) => Promise<void>;
