import { FunctionDeclaration, SchemaType } from '@google/generative-ai';
import { ToolManager } from '../types';
import { executeMcpTool } from '../tool-runner';

export function createReadonlyQueryToolManager(mcpServerUrl: string): ToolManager<{ sql: string }> {
  const toolName = 'query';

  return {
    definition: {
      name: toolName,
      description: 'Run a read-only SQL query',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          sql: {
            type: SchemaType.STRING,
            description: `The SQL query to execute. 
              Only read-only queries for a PostgreSQL database are allowed.
              Your are only allowed to make queries about users (schema: id, name, email)`,
          },
        },
        required: ['sql'],
      },
    } as const as FunctionDeclaration,
    execute: async toolArguments => {
      return await executeMcpTool({
        mcpServerUrl,
        toolArguments,
        toolName,
      });
    },
  };
}
