import { Buyer, PrivateDataUser, User } from '@models/auth';
import { RegisterTransaction } from '../repositories';
import { RunBeforeRegister, RunAfterRegister } from '../services';

type IRegisterProviders<
  CustomOutput extends object = object,
  CustomProperties extends object = object
> = {
  runBeforeRegister: RunBeforeRegister<CustomProperties>;
  runAfterRegister: RunAfterRegister<CustomProperties, CustomOutput>;
};

export interface MakeRegisterUseCaseConfig<CustomOutput extends object = object> {
  registerProviders: RegisterProviders<CustomOutput>;
  runInTransaction: RegisterTransaction<CustomOutput>;
}

export type RegisterDto<CustomOutput extends object = object> = {
  privateDataUser: Partial<PrivateDataUser>;
  rollback: () => Promise<void>;
  user: Partial<User> & Pick<User, 'uid'>;
  buyer: Buyer;
} & CustomOutput;

export type RegisterDtoWithoutRollback<CustomOutput extends object = object> = Omit<
  RegisterDto<CustomOutput>,
  'rollback'
>;

export type RegisterProviders<CustomOutput extends object = object> =
  IRegisterProviders<CustomOutput>;
