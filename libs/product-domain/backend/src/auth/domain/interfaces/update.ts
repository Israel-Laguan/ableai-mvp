import { Infra } from '@models/auth';
import { Transaction } from '@models/shared';
import { PrivateDataUserRepository, UserRepository } from '../repositories';
import { RunInUpdate } from '../services';

export interface MakeUpdateMeUserCaseConfig<
  CustomInput extends object = object,
  CustomOutput extends object = object
> {
  runInUpdate: RunInUpdate<CustomInput, CustomOutput>;
  runInTransaction: Transaction.RunInTransaction<
    {
      PRIVATE_USER_DATA_REPOSITORY: PrivateDataUserRepository;
      USER_REPOSITORY: UserRepository;
    },
    void
  >;
}

export type UpdateDto<CustomOutput extends object = object> = {
  rollback: () => Promise<void>;
} & CustomOutput;

export type UpdateInput<CustomInput extends object = object> = Infra.UpdateUserInput & CustomInput;
