import type { UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { SchemaType } from '@google/generative-ai';

export function MakeRetrieveUserProfileTool(
  retrieveUserProfile: UseCases.RetrieveUserProfile
): ToolManager<{ userId: number }> {
  return {
    definition: {
      name: 'retrieveUserProfile',
      description: 'Retrieves the user profile based on the provided userId.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          userId: {
            type: SchemaType.STRING,
            description: 'The userId of the user profile to retrieve',
          },
        },
        required: ['userId'],
      },
    },

    execute: async ({ userId }) => {
      return await retrieveUserProfile(userId);
    },
  };
}
