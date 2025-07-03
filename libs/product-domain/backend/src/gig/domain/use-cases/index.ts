import { UpdateInput } from '../interfaces';

export type UpdateMeUserUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: UpdateInput<CustomInput>) => Promise<CustomOutput>;
