import { Gig } from '@product-domain/backend';
import { UseCases } from '../../dependency-injection';

export const workerServices = {
  register: async ({
    skills,
    slots,
    worker,
    ...rest
  }: Gig.Domain.Interfaces.RegisterWorkerServiceInput) => {
    return await UseCases.registerWorker({
      skills: skills.map(s => ({ ...s, equipment: s.equipment?.join(',') || undefined })),
      worker: { ...worker, tags: worker.tags?.join(',') || undefined },
      slots: slots.map(slot => ({
        ...slot,
        endTime: new Date(slot.endTime),
        startTime: new Date(slot.startTime),
      })),
      ...rest,
    });
  },
};
