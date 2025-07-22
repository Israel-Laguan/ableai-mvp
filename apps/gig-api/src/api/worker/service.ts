import type { Gig } from '@product-domain/backend';

import { UseCases } from '../../dependency-injection';

export const workerServices = {
  register: async (input: Gig.Domain.Interfaces.RegisterWorkerInput) => {
    return await UseCases.registerWorker(input);
  },
};
