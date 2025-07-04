import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Errors } from '@shared';

import { JsonRpcRequest, JsonRpcResponse, McpExecutorConfig } from '../../types';

/**
 * Executes a tool on the MCP server using JSON-RPC.
 *
 * @param mcpServerUrl - The URL of the MCP server.
 * @param toolArguments - The arguments to pass to the tool
 * @param toolName - The name of the tool to execute.
 */
export async function runMcpRequest<ToolArgs = unknown, ToolOutput = unknown>({
  mcpServerUrl,
  toolArguments,
  toolName,
  method = 'tools/call',
}: McpExecutorConfig<ToolArgs>): Promise<ToolOutput> {
  const jsonRpcPayload: JsonRpcRequest = {
    jsonrpc: '2.0',
    method,
    params: {
      name: toolName,
      arguments: toolArguments,
    },
    id: uuidv4(),
  };

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  };

  try {
    const { data } = await axios.post<JsonRpcResponse>(mcpServerUrl, jsonRpcPayload, { headers });

    const { error } = data;

    if (error) {
      throw new Error(
        `Error from MCP: ${{
          ...error,
        }}`
      );
    }

    return data as ToolOutput;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response
        ? `MCP error: \n HTTP error ${error.response.status}: ${JSON.stringify(
            error.response.data
          )}`
        : `MCP error: \n Connection error: ${error.message}`;

      throw Errors.InternalServerError.create(errorMessage);
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      throw Errors.InternalServerError.create(errorMessage);
    }
  }
}
