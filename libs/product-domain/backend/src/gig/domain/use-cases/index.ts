import { UpdateInput } from '../interfaces';

export * from './accept-gig-work-team';
export * from './get-gig-work';
export * from './get-gig-work-teams';
export * from './gig-work-team';
export * from './register-gig-work';
export * from './register-worker';
export * from './register-buyer';
export * from './update-gig-work-team-payment';

export type UpdateMeUserUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: UpdateInput<CustomInput>) => Promise<CustomOutput>;
