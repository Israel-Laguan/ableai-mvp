import { Infra } from '@models/auth';
import { UpdateTransaction } from '../repositories';
import { RunInUpdate } from '../services';

export interface MakeUpdateMeUserCaseConfig<
  CustomInput extends object = object,
  CustomOutput extends object = object
> {
  runInUpdate: RunInUpdate<CustomInput, CustomOutput>;
  runInTransaction: UpdateTransaction;
}

export type UpdateDto<CustomOutput extends object = object> = {
  rollback: () => Promise<void>;
} & CustomOutput;

export type UpdateInput<CustomInput extends object = object> = Infra.UpdateUserInput & CustomInput;
