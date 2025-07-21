import type { FunctionDeclaration, ModelParams, ObjectSchema, Schema } from '@google/generative-ai';

import type { Interfaces } from '../../../domain';

export interface JsonRpcRequest<Params = unknown> {
  jsonrpc: '2.0';
  method: string;
  params: Params;
  id: string | number;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  result?: unknown;
  error?: JsonRpcError;
  id: string | number | null;
}

export interface McpExecutorConfig<ToolArgs = unknown> {
  mcpServerUrl: string;
  toolName: string;
  toolArguments: ToolArgs;
  method?: 'tools/call' | 'resources/list';
}

export interface ToolManager<ToolArgs = unknown, ServerArgs = unknown, ToolOutput = unknown> {
  definition: FunctionDeclaration;
  execute: (input: Interfaces.FunctionCallsInput<ToolArgs, ServerArgs>) => Promise<ToolOutput>;
}

export interface LlmGeminiServiceConfig {
  apiKey: string;
  llmConfig: Omit<ModelParams, 'tools'> & { tools?: ToolManager[] };
}

export type ToolsManager<ToolArgs = unknown, ServerArgs = unknown, ToolOutput = unknown> = Record<
  string,
  Omit<ToolManager<ToolArgs, ServerArgs, ToolOutput>, 'definition'>
>;

export type TypedObjectSchema<TSchema extends object> = ObjectSchema & {
  properties: {
    [K in keyof TSchema]:
      | Schema
      | TypedObjectSchema<TSchema[K] extends object ? TSchema[K] : never>;
  };
};
