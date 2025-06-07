import { Infra } from '@models/auth';
import { LoginInputs, LoginUseCaseResult, VerifyPhoneNumberOutput } from '../interfaces';

export type LoginUseCase = (input: LoginInputs) => Promise<LoginUseCaseResult>;

export type RegisterUseCase = (input: Infra.RegisterInput) => Promise<void>;

export type VerifyEmailUseCase = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type VerifyPhoneNumberUseCase<T extends object = object, R extends object = object> = (
  input: T
) => Promise<VerifyPhoneNumberOutput<R>>;
