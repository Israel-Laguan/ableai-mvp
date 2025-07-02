import { UpdateDto, UpdateInput } from '../interfaces';

export type RunInUpdate<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: UpdateInput<CustomInput>) => Promise<UpdateDto<CustomOutput>>;
