import { SchemaType } from '@google/generative-ai';

import type { ToolManager } from '../../types';

import { Errors } from '@shared';
import { runMcpRequest } from '../mcp/request';

const PATH = 'READONLY_QUERY_SERVICE';

export function createReadonlyQueryToolManager(mcpServerUrl: string): ToolManager<{ sql: string }> {
  const toolName = 'query';

  return {
    definition: {
      name: toolName,
      description: 'Run a read-only SQL query on the database to retrieve data.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          sql: {
            type: SchemaType.STRING,
            description: `The SQL query to execute. 
              Only read-only queries for a PostgreSQL database are allowed.`,
          },
        },
        required: ['sql'],
      },
    },

    execute: async ({ modelArgs }) => {
      if (!modelArgs || typeof modelArgs.sql !== 'string') {
        throw Errors.BadRequestError.create(
          'Invalid input for retrieveBuyerProfile: userId is required',
          PATH
        );
      }
      return await runMcpRequest({
        mcpServerUrl,
        toolArguments: modelArgs,
        toolName,
      });
    },
  };
}
