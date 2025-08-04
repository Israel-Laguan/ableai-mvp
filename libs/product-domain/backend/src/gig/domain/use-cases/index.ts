import { UpdateInput } from '../interfaces';

export * from './get-gig-work';
export * from './gig-work-team';
export * from './register-gig-work';
export * from './register-worker';
export * from './register-buyer';

export type UpdateMeUserUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: UpdateInput<CustomInput>) => Promise<CustomOutput>;
