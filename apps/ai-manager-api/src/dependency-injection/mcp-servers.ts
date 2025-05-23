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
  connectionString: env.GIG_DB_URL,
});

export const privateGigDbMcpServer = makeMcpPostgresServer({
  connectionString: env.PRIVATE_GIG_DB_URL,
});
