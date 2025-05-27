import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiManager } from '@product-domain/backend';
import { env } from '../config/env.config';

const {
  Infra: {
    Gemini: { Tools, makeLlmToolManagerService },
  },
} = AiManager;

export const generateLlmResponse = makeLlmToolManagerService({
  llmClient: new GoogleGenerativeAI(env.AI_API_KEY),
  systemContext:
    'You are an assistant capable of helping with queries on a PostgreSQL database. Only read-only queries are allowed.',
  tools: [Tools.createReadonlyQueryToolManager(env.MCP_SERVER_URL)],
});
