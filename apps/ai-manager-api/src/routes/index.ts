import { Router } from 'express';

import { AiManager } from '@product-domain/backend';
import { McpServers } from '../dependency-injection';

const {
  Infra: {
    MCP: {
      Utils: { makeStatelessStreamableMcpServerRouter },
    },
  },
} = AiManager;

export const globalPrefix = '/api/ai-manager/v1';

const apiV1 = Router();

const gigDbRouter = makeStatelessStreamableMcpServerRouter({
  server: McpServers.gigDbMcpServer,
  suffix: '/gig-db/mcp',
});

const privateGigDbRouter = makeStatelessStreamableMcpServerRouter({
  server: McpServers.privateGigDbMcpServer,
  suffix: '/private-gig-db/mcp',
});

apiV1.use(globalPrefix, gigDbRouter);
apiV1.use(globalPrefix, privateGigDbRouter);

export default apiV1;
