import { Request, Response } from 'express';

import { CONSTANTS } from '@shared';
import { MCPService } from './service';

const {
  HTTP_STATUS_CODE: { INTERNAL_SERVER_ERROR },
} = CONSTANTS;

export const MCPController = {
  handleRequest: async (req: Request, res: Response) => {
    try {
      await MCPService.handleStatelessStreamableRequest(req, res);
    } catch (err) {
      console.error('MCP Router error:', err);

      if (!res.headersSent) {
        res.status(INTERNAL_SERVER_ERROR).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }
  },
};
