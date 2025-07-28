import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { eq } from 'drizzle-orm';

import type { Worker } from '@models/gig';
import type { WorkerRepositoryMaker } from '../../../../domain/repositories';

import { Infra } from '../../../../../shared';
import { workers } from '../../schemas';
import { makeWorkerMatcher } from './match-workers';
import { makeWorkerRegister } from './register-worker';

export const makeDrizzleWorkerRepository: WorkerRepositoryMaker<NodePgDatabase> = ({ db }) => {
  const repository = Infra.Drizzle.Repositories.makeDrizzleBaseRepository<Worker>({
    db,
    schema: workers,
  });

  return {
    ...repository,
    updateByUserId: async (userId, input) => {
      return await db.update(workers).set(input).where(eq(workers.userId, userId)).returning();
    },
    matchWorkers: makeWorkerMatcher(db),

    registerWorker: makeWorkerRegister(db),
  };
};
