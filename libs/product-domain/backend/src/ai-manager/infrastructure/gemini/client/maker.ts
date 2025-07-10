import type { ChatSession, FunctionDeclaration, ModelParams, Part } from '@google/generative-ai';

import { GoogleGenerativeAI } from '@google/generative-ai';

import type { LlmGeminiServiceConfig, ToolsManager } from '../types';

import { Errors } from '@shared';

const PATH = 'GEMINI_CLIENT';

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

  const llmConfig_1: ModelParams = {
    ...llmConfig,
    tools: [{ functionDeclarations }],
  };

  let getFinalAnswer: (input: {
    accumulatedText: string[];
    chat: ChatSession;
  }) => Promise<string> = async ({ accumulatedText }) => accumulatedText.join('');

  if (
    llmConfig_1.generationConfig?.responseMimeType === 'application/json' &&
    llmConfig_1.generationConfig?.responseSchema
  ) {
    const llmConfig_2 = JSON.parse(JSON.stringify(llmConfig_1));

    delete llmConfig_1.generationConfig.responseMimeType;
    delete llmConfig_1.generationConfig.responseSchema;

    const llmWithOutputSchema = new GoogleGenerativeAI(apiKey).getGenerativeModel({
      ...llmConfig_2,
    });

    getFinalAnswer = async ({ chat }) => {
      const history = await chat.getHistory();
      return (
        (
          await llmWithOutputSchema
            .startChat({ history })
            .sendMessage(`Please provide the final answer.`)
        ).response.candidates?.[0]?.content?.parts?.[0]?.text ??
        'An error occurred while processing your request.'
      );
    };
  }

  const llm = new GoogleGenerativeAI(apiKey).getGenerativeModel(llmConfig_1);

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
    let remainingLoops = 10; // Breaker counter

    try {
      while (true) {
        const response = (await chat.sendMessage(lastPrompt)).response;
        const content = response.candidates?.[0]?.content;
        const parts = content?.parts ?? [];

        const functionCalls = parts.map(part => part.functionCall).filter(v => !!v) ?? [];

        if (functionCalls.length > 0) {
          const toolResponseParts: Part[] = [];

          for (const functionCall of functionCalls) {
            const { args, name } = functionCall;
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

              console.error('Error while running the too: \n', { name, args, errorMessage });

              toolResponsePart.functionResponse.response = {
                error: errorMessage,
              };
            }

            toolResponseParts.push(toolResponsePart);
          }

          lastPrompt = toolResponseParts;

          continue;
        }

        if (parts) {
          for (const part of parts) {
            if (typeof part.text === 'string' && part.text.trim()) {
              accumulatedText.push(part.text);
            }
          }
        }

        const last = accumulatedText[accumulatedText.length - 1];

        if (last.trim().endsWith(':') && remainingLoops > 0) {
          remainingLoops--;

          if (remainingLoops > 0) {
            lastPrompt = '';
          } else {
            lastPrompt = `
                You have reached the maximum of 10 responses ending with ":". 
                Please, finish your answer in the next message.`;
          }

          continue;
        }

        return await getFinalAnswer({ accumulatedText, chat });
      }
    } catch (error) {
      console.error(
        Errors.InternalServerError.create(
          `Error in LLM tool manager:
        ${error instanceof Error ? error.message : String(error)}`,
          PATH
        )
      );

      return `Sorry, I couldn't complete your request at this time. Please try again later.`;
    }
  };
}
