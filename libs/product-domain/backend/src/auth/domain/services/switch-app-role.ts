import { UserClaims } from '@models/auth';

export type SwitchAppRole = (input: UserClaims) => Promise<void>;
