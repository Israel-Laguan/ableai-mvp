import { Infra, PrivateDataUser, User } from '@models/auth';
import { LOGIN_STATUS_CODE } from '../constants';
import { PrivateDataUserRepository, RegisterTransaction, UserRepository } from '../repositories';
import { logAndResultLogin, ParseUserAgent, RunInLogin, RunInRegister } from '../services';

export interface LogAttemptAndNextConfig extends UserAgent {
  IP: string;
}

export interface LogAttemptAndNextInputs {
  loginStatus: LOGIN_STATUS_CODE;
  retryAfter?: Date;
}

export type LoginInput<CustomInput extends object = object> = Infra.LoginInput & {
  IP: string;
  userAgent: string;
} & CustomInput;

export type LoginOutput<CustomOutput extends object = object> = {
  privateDataUser: PrivateDataUser;
  user: User;
} & CustomOutput;

export interface MakeLoginUseCaseConfig<
  CustomInput extends object = object,
  CustomOutput extends object = object
> {
  parseUserAgent: ParseUserAgent;
  privateDataUserRepository: PrivateDataUserRepository;
  runInLogin?: RunInLogin<CustomInput, CustomOutput>;
  userRepository: UserRepository;
}

export interface MakeRegisterUseCaseConfig<R> {
  runInRegister: RunInRegister<R>;
  runInTransaction: RegisterTransaction<R>;
}

export type RunInLoginInput<CustomInput extends object = object> = LoginInput<CustomInput> & {
  logAndResultLogin: logAndResultLogin;
  privateDataUser: PrivateDataUser;
  privateDataUserRepository: PrivateDataUserRepository;
  user: User;
  userRepository: UserRepository;
};

export type UserAgent = {
  browser: string;
  device: string;
  os: string;
};
