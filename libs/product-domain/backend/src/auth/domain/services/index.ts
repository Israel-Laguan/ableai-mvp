import { Infra } from '@models/auth';
import {
  MakeVerifyEmailHTMLInput,
  SendEmailInput,
  UserAgent,
  VerifyEmailInputs,
  VerifyPhoneNumberInputs,
  VerifyPhoneNumberOutputs,
} from '../interfaces';

export type CreateEmailToken = (input: Pick<Infra.RegisterInput, 'email'>) => string;

export type GetGeoLocation = (IP: string) => Promise<string>;

export type MakeVerifyEmailHTML = (inputs: MakeVerifyEmailHTMLInput) => string;

export type ParseUserAgent = (userAgent: string) => UserAgent;

export type RunInEmailVerification = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type RunInPhoneVerification<T, R> = (
  input: VerifyPhoneNumberInputs<T>
) => Promise<VerifyPhoneNumberOutputs<R>>;

export type RunInRegister = (input: Infra.RegisterInput) => Promise<void>;

export type SendEmail = (input: SendEmailInput) => Promise<void>;

export type SendEmailLink = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type VerifyPassword = (token: string) => boolean;

export type VerifyEmail = (input: VerifyEmailInputs) => Promise<void>;

export type VerifyPhoneNumber<T, R> = (
  input: VerifyPhoneNumberInputs<T>
) => Promise<VerifyPhoneNumberOutputs<R>>;
