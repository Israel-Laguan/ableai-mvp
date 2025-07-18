import type { Interfaces, UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { Errors } from '@shared';

const PATH = 'RETRIEVE_WORKER_PROFILE_SERVICE';

export function MakeRetrieveWorkerProfileTool(
  retrieveWorkerProfile: UseCases.RetrieveWorkerProfile
): ToolManager<undefined, Interfaces.RecommendationsServerArgs> {
  return {
    definition: {
      name: 'retrieveWorkerProfile',
      description: 'Retrieves the worker profile.',
    },

    execute: async ({ serverArgs }) => {
      if (!serverArgs || !serverArgs.userId) {
        throw Errors.BadRequestError.create(
          'Invalid input for retrieveBuyerProfile: userId is required',
          PATH
        );
      }
      const { userId } = serverArgs;
      return await retrieveWorkerProfile(userId);
    },
  };
}
