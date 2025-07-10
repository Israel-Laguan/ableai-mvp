import { SchemaType } from '@google/generative-ai';

import type { Interfaces, UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { Schemas } from '../../../zod';

export function MakeMatchWorkerService(
  matchWorkers: UseCases.MatchWorkers
): ToolManager<Interfaces.MatchWorkersInput> {
  return {
    definition: {
      name: 'matchWorkers',
      description: 'Returns a list of workers matching the given criteria.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          userId: {
            type: SchemaType.NUMBER,
            description: 'The id of the user to match workers for.',
          },
          distanceInKm: {
            type: SchemaType.NUMBER,
            description: 'The distance radius of the search.',
          },
          limit: {
            type: SchemaType.NUMBER,
            description: 'The maximum number of workers to return.',
          },
          skills: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
              description: 'The skills to match workers for.',
            },
          },
          startDate: {
            type: SchemaType.STRING,
            description: 'The a valid timestamp start date for the workers availability.',
          },
        },
        required: ['userId', 'skills', 'startDate'],
      },
    },

    execute: async input => {
      const { success, error } = Schemas.MatchWorkersInputSchema.safeParse(input);
      if (!success) {
        throw new Error(`Invalid input for matchWorkers: ${error.message}`);
      } else {
        return await matchWorkers(input);
      }
    },
  };
}
