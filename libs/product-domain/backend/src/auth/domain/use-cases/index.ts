import { Infra } from '@models/auth';
import { LoginInputs, LoginOutput } from '../interfaces';

export type LoginUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: LoginInputs<CustomInput>) => Promise<LoginOutput<CustomOutput>>;

export type RegisterUseCase<R> = (input: Infra.RegisterInput) => Promise<R>;
