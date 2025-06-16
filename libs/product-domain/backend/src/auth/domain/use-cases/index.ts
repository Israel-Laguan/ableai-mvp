import { Infra } from '@models/auth';
import { LoginInput, LoginOutput } from '../interfaces';

export type LoginUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: LoginInput<CustomInput>) => Promise<LoginOutput<CustomOutput>>;

export type RegisterUseCase<CustomOutput extends object = object> = (
  input: Infra.RegisterInput
) => Promise<CustomOutput>;
