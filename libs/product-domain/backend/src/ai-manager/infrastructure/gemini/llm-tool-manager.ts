import { FunctionDeclaration, ModelParams, Part } from '@google/generative-ai';

import { LlmGeminiServiceConfig, ToolsManager } from './types';

export function createLlmToolManagerService({
  llmClient,
  tools,
  systemContext,
}: LlmGeminiServiceConfig) {
  const toolsManager: ToolsManager = {
    undefined: { execute: async () => 'Unknown tool.' },
  };

  const functionDeclarations: FunctionDeclaration[] = tools.map(toolManager => {
    toolsManager[toolManager.definition.name] = { execute: toolManager.execute };
    return toolManager.definition;
  });

  const llmConfig: ModelParams = {
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 500,
      topP: 0.95,
      topK: 20,
      stopSequences: ['\n\n'],
    },
    tools: [{ functionDeclarations }],
  };

  if (systemContext)
    llmConfig.cachedContent = {
      contents: [
        {
          role: 'system',
          parts: [
            {
              text: systemContext,
            },
          ],
        },
      ],
    };

  const llm = llmClient.getGenerativeModel(llmConfig);

  return async ({ prompt }: { prompt: string }): Promise<string> => {
    const chat = llm.startChat();
    const result1 = await chat.sendMessage(prompt);
    const response1 = result1.response;
    const content1 = response1.candidates?.[0]?.content;

    if (content1?.parts?.[0]?.functionCall) {
      const { args, name } = content1.parts[0].functionCall;

      const toolResponsePart: Part = {
        functionResponse: {
          name,
          response: {},
        },
      };

      const toolResult = await toolsManager[name].execute(args);

      try {
        toolResponsePart.functionResponse.response = { result: toolResult };
        return (await chat.sendMessage([toolResponsePart])).response.text();
      } catch (error) {
        console.error(`Error executing the '${name}' tool: ${error.message}`);

        toolResponsePart.functionResponse.response = { error: error.message };
        return (await chat.sendMessage([toolResponsePart])).response.text();
      }
    } else {
      return response1.text();
    }
  };
}
