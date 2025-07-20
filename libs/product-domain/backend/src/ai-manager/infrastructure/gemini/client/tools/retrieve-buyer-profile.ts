import type { Interfaces, UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { Errors } from '@shared';

const PATH = 'RETRIEVE_BUYER_PROFILE_SERVICE';

export function MakeRetrieveBuyerProfileTool(
  retrieveBuyerProfile: UseCases.RetrieveBuyerProfile
): ToolManager<undefined, Interfaces.RecommendationsServerArgs> {
  return {
    definition: {
      name: 'retrieveBuyerProfile',
      description: 'Retrieves the buyer profile based on the provided userId.',
    },

    execute: async ({ serverArgs }) => {
      if (!serverArgs || !serverArgs.userId) {
        throw Errors.BadRequestError.create(
          'Invalid input for retrieveBuyerProfile: userId is required',
          PATH
        );
      }
      const { userId } = serverArgs;
      return await retrieveBuyerProfile(userId);
    },
  };
}
