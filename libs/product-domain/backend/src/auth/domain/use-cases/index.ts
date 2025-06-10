import { Infra } from '@models/auth';
import { LoginInputs, LoginOutput, VerifyPhoneNumberOutput } from '../interfaces';

export type LoginUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: LoginInputs<CustomInput>) => Promise<LoginOutput<CustomOutput>>;

export type RegisterUseCase = (input: Infra.RegisterInput) => Promise<void>;

export type VerifyEmailUseCase = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type VerifyPhoneNumberUseCase<T extends object = object, R extends object = object> = (
  input: T
) => Promise<VerifyPhoneNumberOutput<R>>;
