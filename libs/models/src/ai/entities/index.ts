import { IBase } from '../../shared/base';

export interface AiPrompt extends IBase {
  promptKey: string;
  promptText: string;
  description?: string | null;
  version: number;
  isActive: boolean;
  lastUpdatedByUserId?: number | null;
}
