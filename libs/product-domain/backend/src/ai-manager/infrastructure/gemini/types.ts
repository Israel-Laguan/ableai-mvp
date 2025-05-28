import { FunctionDeclaration, GoogleGenerativeAI } from '@google/generative-ai';

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
}

export interface ToolManager<ToolArgs = unknown, ToolOutput = unknown> {
  definition: FunctionDeclaration;
  execute: (args: ToolArgs) => Promise<ToolOutput>;
}

export interface LlmGeminiServiceConfig {
  llmClient: GoogleGenerativeAI;
  tools: ToolManager[];
  systemContext?: string;
}

export type ToolsManager = Record<string, Omit<ToolManager, 'definition'>>;
