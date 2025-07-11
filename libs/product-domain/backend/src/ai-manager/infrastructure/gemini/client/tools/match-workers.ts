import type { Interfaces, UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { MatchWorkersInputSchema } from '../../schemas';
import { Schemas } from '../../../zod';
import { Errors } from '@shared';

const PATH = 'MATCH_WORKER_SERVICE';

export function MakeMatchWorkerTool(
  matchWorkers: UseCases.MatchWorkers
): ToolManager<Interfaces.MatchWorkersInput> {
  return {
    definition: {
      name: 'matchWorkers',
      description: 'Returns a list of workers matching the given criteria.',
      parameters: MatchWorkersInputSchema,
    },

    execute: async input => {
      const { success, error } = Schemas.MatchWorkersInputSchema.safeParse(input);
      if (!success) {
        throw Errors.BadRequestError.create(
          `Invalid input for matchWorkers: ${JSON.stringify(error.issues)}`,
          PATH
        );
      } else {
        return await matchWorkers(input);
      }
    },
  };
}
