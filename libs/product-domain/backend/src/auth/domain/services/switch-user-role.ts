import { RunInSwitchUserRoleInput } from '../interfaces';

export type RunInSwitchUserRole<
  ServiceInput extends object = object,
  ServiceOutput extends object = object
> = (input: RunInSwitchUserRoleInput<ServiceInput>) => Promise<ServiceOutput>;
