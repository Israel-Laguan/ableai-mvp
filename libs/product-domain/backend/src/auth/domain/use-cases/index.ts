import type { Infra } from '@models/auth';
import type {
  LoginInput,
  LoginOutput,
  RegisterDtoWithoutRollback,
  SwitchUserRoleInput,
  SwitchUserRoleOutput,
  UpdateInput,
} from '../interfaces';

export type LoginUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: LoginInput<CustomInput>) => Promise<LoginOutput<CustomOutput>>;

export type RegisterUseCase<CustomOutput extends object = object> = (
  input: Infra.RegisterInput
) => Promise<RegisterDtoWithoutRollback<CustomOutput>>;

export type SwitchUserRole<
  ServiceInput extends object = object,
  ServiceOutput extends object = object
> = (input: SwitchUserRoleInput<ServiceInput>) => Promise<SwitchUserRoleOutput<ServiceOutput>>;

export type UpdateMeUserUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: UpdateInput<CustomInput>) => Promise<CustomOutput>;
