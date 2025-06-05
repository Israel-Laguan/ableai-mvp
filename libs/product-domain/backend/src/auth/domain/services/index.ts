import { Infra } from '@models/auth';
import { UserAgent, VerifyEmailInputs, VerifyPhoneNumberInputs } from '../interfaces';

export type CreateEmailToken = (input: Pick<Infra.RegisterInput, 'email'>) => string;

export type GetGeoLocation = (IP: string) => Promise<string>;

export type ParseUserAgent = (userAgent: string) => UserAgent;

export type RunInEmailVerification = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type RunInRegister = (input: Infra.RegisterInput) => Promise<void>;

export type SendEmailLink = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type VerifyPassword = (token: string) => boolean;

export type VerifyEmail = (input: VerifyEmailInputs) => Promise<void>;

export type VerifyPhoneNumber<R> = (input: VerifyPhoneNumberInputs) => Promise<R>;
