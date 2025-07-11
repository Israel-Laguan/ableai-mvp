import type { UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { SchemaType } from '@google/generative-ai';

export function MakeRetrieveBuyerProfileTool(
  retrieveBuyerProfile: UseCases.RetrieveBuyerProfile
): ToolManager<{ userId: number }> {
  return {
    definition: {
      name: 'retrieveBuyerProfile',
      description: 'Retrieves the buyer profile based on the provided userId.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          userId: {
            type: SchemaType.NUMBER,
            description: 'The userId of the buyer profile to retrieve',
          },
        },
        required: ['userId'],
      },
    },

    execute: async ({ userId }) => {
      return await retrieveBuyerProfile(userId);
    },
  };
}
