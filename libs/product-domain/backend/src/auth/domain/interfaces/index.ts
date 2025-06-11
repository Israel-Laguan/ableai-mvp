import { Infra, User } from '@models/auth';
import { LoginStatusKeys } from '../constants';
import { PrivateDataUserRepository, RegisterTransaction, UserRepository } from '../repositories';
import { GenerateTokenPair, ParseUserAgent, RunInLogin, RunInRegister } from '../services';

export interface AccessTokenPayload extends GenerateTokenPairInput {
  type: 'access';
  exp: number;
  iat: number;
}

export type GenerateTokenPairInput = Pick<User, 'id' | 'roleId'>;

export interface LogAttemptAndNextConfig extends UserAgent {
  IP: string;
}

export interface LogAttemptAndNextInputs extends Pick<User, 'blockId'> {
  loginStatus: LoginStatusKeys;
  retryAfter?: Date;
}

export type LoginInput<CustomInput extends object = object> = Infra.LoginInput & {
  IP: string;
  userAgent: string;
} & CustomInput;

export type LoginOutput<CustomOutput extends object = object> = Pick<User, 'lastAppRole'> &
  TokenPair &
  CustomOutput;

export interface MakeLoginUseCaseConfig<
  CustomInput extends object = object,
  CustomOutput extends object = object
> {
  generateTokenPair: GenerateTokenPair;
  parseUserAgent: ParseUserAgent;
  privateDataUserRepository: PrivateDataUserRepository;
  runInLogin?: RunInLogin<CustomInput, CustomOutput>;
  userRepository: UserRepository;
}

export interface MakeRegisterUseCaseConfig<R> {
  runInRegister: RunInRegister<R>;
  runInTransaction: RegisterTransaction<R>;
}

export interface RefreshTokenPayload extends Pick<GenerateTokenPairInput, 'id'> {
  type: 'refresh';
  exp: number;
  iat: number;
}

export type RunInLoginInput<CustomInput extends object = object> = LoginInput<CustomInput> & {
  userRepository: UserRepository;
  privateDataUserRepository: PrivateDataUserRepository;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type UserAgent = {
  browser: string;
  device: string;
  os: string;
};
