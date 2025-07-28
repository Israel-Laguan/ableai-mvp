import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { Domain } from '../../../..';

import { recommendations, skills, slots, workers } from '../../schemas';

export function makeWorkerRegister(db: NodePgDatabase): Domain.Repositories.RegisterWorker {
  return async ({ recommendations: recs, skills: skl, slots: slt, worker }) => {
    return await db.transaction(async tx => {
      const [workerResult] = await tx.insert(workers).values(worker).returning();

      const workerId = workerResult.id;

      const [skillsResult, slotResult, recommendationsResult] = await Promise.all([
        await tx
          .insert(skills)
          .values(skl.map(s => ({ ...s, workerId })))
          .returning(),

        await tx
          .insert(slots)
          .values(slt.map(slot => ({ ...slot, workerId })))
          .returning(),

        await tx
          .insert(recommendations)
          .values(recs.map(r => ({ ...r, workerId })))
          .returning(),
      ]);

      return {
        skills: skillsResult,
        slots: slotResult,
        worker: workerResult,
        recommendations: recommendationsResult,
      };
    });
  };
}
