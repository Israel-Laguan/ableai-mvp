import type { Interfaces, UseCases } from '../../../../domain';
import type { ToolManager } from '../../types';

import { Errors } from '@shared';
import { MatchWorkersInputSchema } from '../../schemas';
import { Schemas } from '../../../zod';

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

    execute: async ({ modelArgs }) => {
      if (!modelArgs) {
        throw Errors.BadRequestError.create('Invalid input for matchWorkers', PATH);
      }
      const { success, error, data } = Schemas.MatchWorkersInputSchema.safeParse(modelArgs);
      if (!success) {
        throw Errors.BadRequestError.create(
          `Invalid input for matchWorkers: ${JSON.stringify(error.issues)}`,
          PATH
        );
      } else {
        return await matchWorkers(data as Interfaces.MatchWorkersInput);
      }
    },
  };
}
