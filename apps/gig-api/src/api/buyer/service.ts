import type { Gig } from '@product-domain/backend';

import { UseCases } from '../../dependency-injection';

export const buyerServices = {
  register: async (input: Gig.Domain.Interfaces.RegisterBuyerInput) => {
    return await UseCases.registerBuyer(input);
  },
};
