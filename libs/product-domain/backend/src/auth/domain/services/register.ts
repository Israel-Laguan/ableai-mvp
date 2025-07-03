import { Infra } from '@models/auth';
import { RegisterDto, RegisterDtoWithoutRollback } from '../interfaces';

export type RunBeforeRegister<CustomOutput extends object = object> = (
  input: Infra.RegisterInput
) => Promise<Omit<RegisterDto<CustomOutput>, 'privateDataUser' | 'buyer'>>;

export type RunAfterRegister<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (
  input: RegisterDtoWithoutRollback<CustomInput>
) => Promise<RegisterDtoWithoutRollback<CustomOutput>>;
