import { Infra, UserWithPassword } from '@models/auth';
import { CONSTANTS } from '@shared';
import { LoginStatusKeys } from '../constants';
import { PrivateDataUserRepository, RegisterTransaction, UserRepository } from '../repositories';
import { GetGeoLocation, ParseUserAgent, RunInEmailVerification, RunInRegister } from '../services';
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

export interface MakeLoginUseCaseConfig {
  getGeoLocation: GetGeoLocation;
  parseUserAgent: ParseUserAgent;
  privateDataUserRepository: PrivateDataUserRepository;
  userRepository: UserRepository;
}

export interface MakeVerifyEmailUseCaseConfig {
  userRepository: UserRepository;
  privateDataUserRepository: PrivateDataUserRepository;
  runInEmailVerification: RunInEmailVerification;
}

export interface MakeRegisterUseCaseConfig {
  runInTransaction: RegisterTransaction;
  runInRegister: RunInRegister;
}

export interface LogAttemptAndNextConfig extends UserAgent {
  geoLocation: string;
  IP: string;
}

export type UserAgent = {
  browser: string;
  device: string;
  os: string;
};

export type VerifyEmailInputs = Pick<Infra.RegisterInput, 'email'>;

export type VerifyPhoneNumberInputs = Pick<Infra.RegisterInput, 'email' | 'phoneNumber'>;
