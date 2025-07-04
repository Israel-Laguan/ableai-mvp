import { AiManager } from '@product-domain/backend';
import { env } from '../../config/env.config';

const {
  Infra: {
    Anthropic: {
      MCP: {
        Server: {
          Adapters: { makeStatelessStreamableRequestHandler },
        },
        Postgres: { makeMcpPostgresServer },
      },
    },
  },
} = AiManager;

const server = makeMcpPostgresServer({
  poolConfig: { connectionString: env.GIG_DB_URL },
});

export const AnthropicMCPService = {
  closePool: server.closePool,
  handleStatelessStreamableRequest: makeStatelessStreamableRequestHandler(server),
};
