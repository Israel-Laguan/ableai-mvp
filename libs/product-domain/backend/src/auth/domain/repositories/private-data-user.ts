import type { PrivateDataUser } from '@models/auth';
import type { ISQLBaseRepository } from '@models/shared';

export type PrivateDataUserRepository = ISQLBaseRepository<PrivateDataUser> & {
  getByEmail: (input: { email: string }) => Promise<PrivateDataUser | null>;
};
