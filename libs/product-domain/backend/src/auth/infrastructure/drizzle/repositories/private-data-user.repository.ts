import { Infra } from '@models/auth';

import { privateDataUser } from '../schemas';
import { type PrivateDataUserRepository } from '../../../domain';
import { Repository } from '../../../../shared/infrastructure/drizzle';
import { eq } from 'drizzle-orm';

type DrizzleDb = Repository.DrizzleDb;

export const makeDataPrivateUserDrizzleRepository = (db: DrizzleDb): PrivateDataUserRepository => {
  return {
    create: async (privateDataUserInput: Infra.PrivateDataUserCreateInput) => {
      const result = db
        .insert(privateDataUser)
        .values({
          fullName: privateDataUserInput.fullName,
          email: privateDataUserInput.email,
          phoneNumber: privateDataUserInput?.phoneNumber || null,
        })
        .returning();

      return result;
    },
    getByEmail(input: { email: string }) {
      return db
        .select()
        .from(privateDataUser)
        .where(eq(privateDataUser.email, input.email))
        .limit(1)
        .then(result => {
          if (result && result.length) {
            return result[0];
          }

          return null;
        });
    },
  };
};
