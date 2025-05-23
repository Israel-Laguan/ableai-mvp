import { Router } from 'express';

import { AiManager } from '@product-domain/backend';
import { McpServers } from '../dependency-injection';

const {
  Infra: {
    MCP: {
      Routers: { makeStatelessStreamableMcpRouter },
    },
  },
} = AiManager;

export const globalPrefix = '/api/ai-manager/v1';

const apiV1 = Router();

const gigDbRouter = makeStatelessStreamableMcpRouter({
  server: McpServers.gigDbMcpServer,
  suffix: '/gig-db/mcp',
});

apiV1.use(globalPrefix, gigDbRouter);

export default apiV1;
