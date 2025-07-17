import { geminiService } from '../../dependency-injection/services';
import { UseCases } from '../../dependency-injection';
import { MatchWorkersInput } from '../../interfaces';

export const assistantService = {
  handleUserPrompt: async (prompt: string) => await geminiService.handleUserPrompt({ prompt }),
  matchWorkers: async (input: MatchWorkersInput) => await UseCases.matchWorkers(input),
};
