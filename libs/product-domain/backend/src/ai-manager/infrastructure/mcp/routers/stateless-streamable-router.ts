import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

import { Router, Response, Request } from 'express';

interface RouterConfig {
  server: Server;
  suffix: string;
}

/**
 *
 * @param param0 - Configuration object containing the server and suffix.
 * @returns An Express router that handles incoming requests for the Model Context Protocol
 * (MCP) server.
 *
 * JSON-RPC 2.0 is used for communication, and the router is stateless.
 */
export const makeStatelessStreamableMcpRouter = ({ server, suffix }: RouterConfig): Router => {
  const router = Router();

  router.post(suffix, async (req: Request, res: Response) => {
    if (req.method !== 'POST') {
      res.status(405).json({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Method not allowed.',
        },
        id: null,
      });
      return;
    }

    try {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });

      res.on('close', () => {
        transport.close();
        server.close();
      });

      await server.connect(transport);

      await transport.handleRequest(req, res, req.body);
    } catch (err) {
      console.error('MCP Router error:', err);

      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }
  });

  return router;
};
