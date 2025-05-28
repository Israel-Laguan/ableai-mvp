import { AiManager } from '@product-domain/backend';
import { env } from '../config/env.config';

const {
  Infra: {
    MCP: {
      Servers: { makeMcpPostgresServer },
    },
  },
} = AiManager;

export const gigDbMcpServer = makeMcpPostgresServer({
  poolConfig: { connectionString: env.GIG_DB_URL },
});
