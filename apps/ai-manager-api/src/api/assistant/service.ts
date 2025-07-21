import { geminiService } from '../../dependency-injection/services';
import { UseCases } from '../../dependency-injection';
import { MatchWorkersInput } from '../../interfaces';

export const assistantService = {
  handleUserPrompt: async (prompt: string) => await geminiService.handleUserPrompt({ prompt }),

  matchWorkers: async (input: MatchWorkersInput) => await UseCases.matchWorkers(input),

  handleBuyerRecommendationRequest: async (userId: number) =>
    await geminiService.buyerProfileRecommendationAssistant({
      prompt:
        'give me some suggestion about my user and my buyer profile. Use the provided call functions to rich this goal.',
      serverArgs: { userId },
    }),

  handleWorkerRecommendationRequest: async (userId: number) =>
    await geminiService.buyerProfileRecommendationAssistant({
      prompt:
        'give me some suggestion about my user and my worker profile. Use the provided call functions to rich this goal.',
      serverArgs: { userId },
    }),
};
