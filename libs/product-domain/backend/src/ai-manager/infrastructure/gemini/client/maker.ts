import {
  FunctionCall,
  FunctionDeclaration,
  GoogleGenerativeAI,
  ModelParams,
  Part,
} from '@google/generative-ai';

import { Errors } from '@shared';
import { LlmGeminiServiceConfig, ToolsManager } from '../types';

const PATH = 'GEMINI_CLIENT_MAKER';

export function makeGeminiClient({ apiKey, llmConfig }: LlmGeminiServiceConfig) {
  const toolsManager: ToolsManager = {
    undefined: { execute: async () => 'Unknown tool.' },
  };

  const { tools } = llmConfig;

  const functionDeclarations: FunctionDeclaration[] = tools
    ? tools.map(toolManager => {
        toolsManager[toolManager.definition.name] = { execute: toolManager.execute };
        return toolManager.definition;
      })
    : [];

  const newLlmConfig: ModelParams = {
    ...llmConfig,
    tools: [{ functionDeclarations }],
  };

  const llm = new GoogleGenerativeAI(apiKey).getGenerativeModel(newLlmConfig);

  const mcpContext = `Reminder: You are interacting with an MCP server. You can use the available function calls to query information, execute actions, and resolve your own doubts. You may perform multiple queries to the MCP server during the conversation. If you need more context, request additional information using function calls.`;

  // Conversational function call loop
  return async ({ prompt }: { prompt: string }): Promise<string> => {
    const chat = llm.startChat();
    const accumulatedText: string[] = [];

    let lastPrompt: string | Part[] = `
      # Server context
      Use the available function calls to interact with the MCP server to rich your goals.

      # User prompt
      ${prompt}`;
    let endsWithColonCount = 0; // Breaker counter

    try {
      while (true) {
        const response = (await chat.sendMessage(lastPrompt)).response;
        const content = response.candidates?.[0]?.content;
        const functionCalls = content?.parts?.filter((part: Part) => part.functionCall) ?? [];

        if (content?.parts) {
          for (const part of content.parts) {
            if (typeof part.text === 'string' && part.text.trim()) {
              accumulatedText.push(part.text);
            }
          }
        }

        if (functionCalls.length > 0) {
          const toolResponseParts: Part[] = [];

          for (const part of functionCalls) {
            const { args, name } = part.functionCall as FunctionCall;
            const toolResponsePart: Part = {
              functionResponse: {
                name,
                response: {},
              },
            };

            try {
              const tool = toolsManager[name];

              if (!tool) {
                throw Errors.InternalServerError.create(`Error: Tool "${name}" not found.`, PATH);
              }

              const toolResult = await tool.execute(args);

              toolResponsePart.functionResponse.response = { result: toolResult, mcpContext };
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              toolResponsePart.functionResponse.response = {
                error: errorMessage,
              };
            }

            toolResponseParts.push(toolResponsePart);
          }

          lastPrompt = toolResponseParts;
        } else {
          if (accumulatedText.length === 0) {
            return response.text();
          }

          const last = accumulatedText[accumulatedText.length - 1];

          if (last.trim().endsWith(':') && endsWithColonCount < 11) {
            endsWithColonCount++;
            if (endsWithColonCount >= 10) {
              lastPrompt = `
                You have reached the maximum of 10 responses ending with ":". 
                Please, finish your answer in the next message.`;
            } else {
              lastPrompt = '';
            }

            continue;
          }

          return accumulatedText.join('');
        }
      }
    } catch (error) {
      console.error('Error in LLM tool manager:', error);
      return `Sorry, I couldn't complete your request at this time. Please try again later.`;
    }
  };
}
