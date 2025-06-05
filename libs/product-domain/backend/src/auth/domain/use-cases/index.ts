import { Infra } from '@models/auth';
import {
  LoginInputs,
  LoginUseCaseResult,
  VerifyPhoneNumberInputs,
  VerifyPhoneNumberOutputs,
} from '../interfaces';

export type LoginUseCase = (input: LoginInputs) => Promise<LoginUseCaseResult>;

export type RegisterUseCase = (input: Infra.RegisterInput) => Promise<void>;

export type VerifyEmailUseCase = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type VerifyPhoneNumberUseCase<T, R> = (
  input: VerifyPhoneNumberInputs<T>
) => Promise<VerifyPhoneNumberOutputs<R>>;
