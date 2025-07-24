export * from './register-worker';
import { UpdateInput } from '../interfaces';

export * from './register-buyer';

export type UpdateMeUserUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: UpdateInput<CustomInput>) => Promise<CustomOutput>;
