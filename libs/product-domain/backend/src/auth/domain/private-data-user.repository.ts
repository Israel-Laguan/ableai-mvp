/* eslint-disable no-unused-vars */
import type { PrivateDataUser } from '@models/auth';

import { type Domain as SharedDomain } from '../../shared';

// TODO: Repair Lint for Types
export type PrivateDataUserRepository = SharedDomain.ISQLBaseRepository<PrivateDataUser> & {
  getByEmail: (input: { email: string }) => Promise<PrivateDataUser | null>;
};
