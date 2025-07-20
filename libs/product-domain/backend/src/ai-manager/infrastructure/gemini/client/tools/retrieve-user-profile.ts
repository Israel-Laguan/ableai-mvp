import type { Interfaces, UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { Errors } from '@shared';

const PATH = 'RETRIEVE_USER_PROFILE_SERVICE';

export function MakeRetrieveUserProfileTool(
  retrieveUserProfile: UseCases.RetrieveUserProfile
): ToolManager<undefined, Interfaces.RecommendationsServerArgs> {
  return {
    definition: {
      name: 'retrieveUserProfile',
      description: 'Retrieves the user profile.',
    },

    execute: async ({ serverArgs }) => {
      if (!serverArgs || !serverArgs.userId) {
        throw Errors.BadRequestError.create(
          'Invalid input for retrieveBuyerProfile: userId is required',
          PATH
        );
      }
      const { userId } = serverArgs;
      return await retrieveUserProfile(userId);
    },
  };
}
