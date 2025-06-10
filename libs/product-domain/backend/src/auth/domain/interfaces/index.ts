import { Infra, User, UserWithPassword } from '@models/auth';
import { LoginStatusKeys } from '../constants';
import { PrivateDataUserRepository, RegisterTransaction, UserRepository } from '../repositories';
import {
  GenerateTokenPair,
  GetGeoLocation,
  ParseUserAgent,
  RunInEmailVerification,
  RunInLogin,
  RunInPhoneVerification,
  RunInRegister,
} from '../services';

export interface AccessTokenPayload extends GenerateTokenPairInput {
  type: 'access';
  exp: number;
  iat: number;
}

export type GenerateTokenPairInput = Pick<User, 'id' | 'roleId'>;

export interface LogAttemptAndNextConfig extends UserAgent {
  geoLocation: string;
  IP: string;
}

export interface LogAttemptAndNextInputs extends Pick<User, 'blockId'> {
  loginStatus: LoginStatusKeys;
  retryAfter?: Date;
}

export type LoginInputs<CustomInput extends object = object> = Infra.LoginInput & {
  IP: string;
  userAgent: string;
} & CustomInput;

export type LoginOutput<CustomOutput extends object = object> = Pick<
  UserWithPassword,
  'lastAppRole'
> &
  TokenPair &
  CustomOutput;

export interface MakeVerifyEmailHTMLInput {
  link: string;
}

export interface MakeLoginUseCaseConfig<
  CustomInput extends object = object,
  CustomOutput extends object = object
> {
  getGeoLocation: GetGeoLocation;
  generateTokenPair: GenerateTokenPair;
  parseUserAgent: ParseUserAgent;
  privateDataUserRepository: PrivateDataUserRepository;
  runInLogin?: RunInLogin<CustomInput, CustomOutput>;
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

export interface RefreshTokenPayload extends Pick<GenerateTokenPairInput, 'id'> {
  type: 'refresh';
  exp: number;
  iat: number;
}

export type RunInLoginInput<CustomInput extends object = object> = LoginInputs<CustomInput> & {
  userRepository: UserRepository;
  privateDataUserRepository: PrivateDataUserRepository;
};

export type RunInPhoneVerificationOutput<R extends object = object> = VerifyPhoneNumberOutput<R> &
  Pick<Infra.RegisterInput, 'email' | 'phoneNumber'>;

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type UserAgent = {
  browser: string;
  device: string;
  os: string;
};

export type VerifyEmailInput = Pick<Infra.RegisterInput, 'email'>;

export type VerifyPhoneNumberOutput<R extends object = object> = {
  verified: boolean;
} & R;
