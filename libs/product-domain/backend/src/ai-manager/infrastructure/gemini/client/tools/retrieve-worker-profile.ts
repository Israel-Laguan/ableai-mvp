import type { UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { SchemaType } from '@google/generative-ai';

export function MakeRetrieveWorkerProfileTool(
  retrieveWorkerProfile: UseCases.RetrieveWorkerProfile
): ToolManager<{ userId: number }> {
  return {
    definition: {
      name: 'retrieveWorkerProfile',
      description: 'Retrieves the worker profile based on the provided userId.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          userId: {
            type: SchemaType.STRING,
            description: 'The userId of the worker profile to retrieve',
          },
        },
        required: ['userId'],
      },
    },

    execute: async ({ userId }) => {
      return await retrieveWorkerProfile(userId);
    },
  };
}
