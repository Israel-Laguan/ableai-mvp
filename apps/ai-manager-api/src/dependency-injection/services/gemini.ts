import { AiManager } from '@product-domain/backend';
import { env } from '../../config/env.config';
import { Instructions } from '../ai';
import { SchemaType } from '@google/generative-ai';

const {
  Infra: {
    Gemini: {
      Client: {
        makeGeminiClient,
        Tools: { createListResourceToolManager, createReadonlyQueryToolManager },
      },
    },
  },
} = AiManager;

export const geminiService = {
  handleUserPrompt: makeGeminiClient({
    apiKey: env.AI_API_KEY,

    llmConfig: {
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        maxOutputTokens: 1024,
        stopSequences: ['\n\n'],
        topK: 40,
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            text: {
              type: SchemaType.STRING,
              description: 'The response text from the AI model.',
            },
          },
          required: ['text'],
        },
      },

      tools: [
        createReadonlyQueryToolManager(env.MCP_SERVER_URL),
        createListResourceToolManager(env.MCP_SERVER_URL),
      ],

      systemInstruction: Instructions.gigDbAssistantInstructions,
    },
  }),
};
