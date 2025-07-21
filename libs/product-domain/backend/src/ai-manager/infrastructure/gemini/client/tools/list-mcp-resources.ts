import { SchemaType } from '@google/generative-ai';

import type { ToolManager } from '../../types';

import { runMcpRequest } from '../mcp/request';

export function createListResourceToolManager(mcpServerUrl: string): ToolManager {
  const toolName = 'list_resources';

  return {
    definition: {
      name: toolName,
      description: 'Get the list of available database tables (resources) from the MCP server.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {},
        required: [],
      },
    },

    execute: async () => {
      return await runMcpRequest({
        mcpServerUrl,
        toolArguments: {},
        toolName,
        method: 'resources/list',
      });
    },
  };
}
