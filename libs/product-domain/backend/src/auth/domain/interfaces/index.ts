import { Infra, UserWithPassword } from '@models/auth';
import { CONSTANTS } from '@shared';
import { LoginStatusKeys } from '../constants';
import { PrivateDataUserRepository, RegisterTransaction, UserRepository } from '../repositories';
import {
  GetGeoLocation,
  ParseUserAgent,
  RunInEmailVerification,
  RunInPhoneVerification,
  RunInRegister,
} from '../services';

export interface LogAttemptAndNextConfig extends UserAgent {
  geoLocation: string;
  IP: string;
}

export interface LogAttemptAndNextInputs {
  loginStatus: LoginStatusKeys;
  HTTPStatusCode: CONSTANTS.HTTPStatusCode;
}

export interface LoginInputs extends Infra.LoginInput {
  IP: string;
  userAgent: string;
}

export interface LoginUseCaseResult extends Pick<UserWithPassword, 'lastAppRole'> {
  session: string;
}

export interface MakeVerifyEmailHTMLInput {
  link: string;
}

export interface MakeLoginUseCaseConfig {
  getGeoLocation: GetGeoLocation;
  parseUserAgent: ParseUserAgent;
  privateDataUserRepository: PrivateDataUserRepository;
  userRepository: UserRepository;
}

export interface MakeRegisterUseCaseConfig {
  runInRegister: RunInRegister;
  runInTransaction: RegisterTransaction;
}

export interface MakeVerifyEmailUseCaseConfig {
  userRepository: UserRepository;
  privateDataUserRepository: PrivateDataUserRepository;
  runInEmailVerification?: RunInEmailVerification;
}

export interface MakeVerifyPhoneNumberUseCaseConfig<
  T extends object = object,
  R extends object = object
> {
  privateDataUserRepository: PrivateDataUserRepository;
  runInPhoneVerification: RunInPhoneVerification<T, R>;
}

export type RunInPhoneVerificationOutput<R extends object = object> = VerifyPhoneNumberOutput<R> &
  Pick<Infra.RegisterInput, 'email' | 'phoneNumber'>;

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export type UserAgent = {
  browser: string;
  device: string;
  os: string;
};

export type VerifyEmailInputs = Pick<Infra.RegisterInput, 'email'>;

export type VerifyPhoneNumberOutput<R extends object = object> = {
  verified: boolean;
} & R;
