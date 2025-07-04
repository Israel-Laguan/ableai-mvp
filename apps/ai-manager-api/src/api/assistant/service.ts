import { geminiService } from '../../dependency-injection/services';

export const assistantService = {
  handleUserPrompt: async (prompt: string) => await geminiService.handleUserPrompt({ prompt }),
};
