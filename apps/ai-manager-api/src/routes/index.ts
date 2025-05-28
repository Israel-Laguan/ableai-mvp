import { Router } from 'express';

import { Express } from '@backend';
import { AiManager } from '@product-domain/backend';
import { McpServers } from '../dependency-injection';
import assistantsRouter from './assistants';

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
  suffix: '/mcp',
});

apiV1.use(globalPrefix, gigDbRouter);
apiV1.use(globalPrefix, assistantsRouter);
apiV1.use(globalPrefix, Express.Api.Health.router);

export default apiV1;
