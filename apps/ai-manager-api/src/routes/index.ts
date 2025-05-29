import { Router } from 'express';

import { AiManager } from '@product-domain/backend';

import assistantsRouter from './assistants';
import { McpServers } from '../dependency-injection';

const {
  Infra: {
    MCP: {
      Routers: { makeStatelessStreamableMcpRouter },
    },
  },
} = AiManager;

const apiV1 = Router();

const gigDbRouter = makeStatelessStreamableMcpRouter({
  server: McpServers.gigDbMcpServer,
  suffix: '/mcp',
});

apiV1.use(gigDbRouter);
apiV1.use(assistantsRouter);

export default apiV1;
