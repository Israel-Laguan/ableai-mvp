import { Infra } from '@models/auth';
import {
  GenerateTokenPairInput,
  MakeVerifyEmailHTMLInput,
  RunInLoginInput,
  RunInPhoneVerificationOutput,
  SendEmailInput,
  TokenPair,
  UserAgent,
  VerifyEmailInput,
} from '../interfaces';

export type CreateEmailToken = (input: Pick<Infra.RegisterInput, 'email'>) => string;

export type GenerateTokenPair = (input: GenerateTokenPairInput) => TokenPair | Promise<TokenPair>;

export type MakeVerifyEmailHTML = (inputs: MakeVerifyEmailHTMLInput) => string;

export type ParseUserAgent = (userAgent: string) => UserAgent;

export type RunInEmailVerification = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type RunInLogin<
  CustomOInput extends object = object,
  CustomOutput extends object = object
> = (input: RunInLoginInput<CustomOInput>) => Promise<CustomOutput>;

export type RunInPhoneVerification<T extends object = object, R extends object = object> = (
  input: T
) => Promise<RunInPhoneVerificationOutput<R>>;

export type RunInRegister = (input: Infra.RegisterInput) => Promise<void>;

export type SendEmail<R = unknown> = (input: SendEmailInput) => Promise<R>;

export type SendEmailLink<R = unknown> = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<R>;

export type VerifyPassword = (token: string) => boolean;

export type VerifyEmail<R = unknown> = (input: VerifyEmailInput) => Promise<R>;
