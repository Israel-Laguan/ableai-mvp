import { Infra, UserWithPassword } from '@models/auth';
import { CONSTANTS } from '@shared';
import { LoginStatusKeys } from '../constants';
import { PrivateDataUserRepository, RegisterTransaction, UserRepository } from '../repositories';
import { GetGeoLocation, ParseUserAgent, SendEmailLink } from '../services';

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
}

export interface MakeRegisterUseCaseConfig {
  runInTransaction: RegisterTransaction;
  sendEmailLink: SendEmailLink;
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
