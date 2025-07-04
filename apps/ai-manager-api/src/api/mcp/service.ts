import { Request, Response } from 'express';

import { AnthropicMCPService } from '../../dependency-injection/services';

export const MCPService = {
  async handleStatelessStreamableRequest(req: Request, res: Response) {
    return await AnthropicMCPService.handleStatelessStreamableRequest(req, res);
  },
};
