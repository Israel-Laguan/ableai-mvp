import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { JsonRpcRequest, JsonRpcResponse, McpExecutorConfig } from './types';

/**
 * Executes a tool on the MCP server using JSON-RPC.
 *
 * @param mcpServerUrl - The URL of the MCP server.
 * @param toolArguments - The arguments to pass to the tool
 * @param toolName - The name of the tool to execute.
 */
export async function executeMcpTool<ToolArgs = unknown, ToolOutput = unknown>({
  mcpServerUrl,
  toolArguments,
  toolName,
}: McpExecutorConfig<ToolArgs>): Promise<ToolOutput> {
  const requestId: string = uuidv4();

  const jsonRpcPayload: JsonRpcRequest = {
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: toolArguments,
    },
    id: requestId,
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

      console.error(errorMessage);

      throw new Error(errorMessage);
    } else {
      console.error(`MCP error: ${error.message}`);
      throw error;
    }
  }
}
