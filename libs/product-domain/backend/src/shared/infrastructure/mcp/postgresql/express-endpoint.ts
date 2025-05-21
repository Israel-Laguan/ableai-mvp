import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Express, Response, Request } from 'express';
import { Pool, PoolConfig } from 'pg';

interface McpPostgresServerConfig {
  pool: PoolConfig;
  transport?: Transport;
}

function createMcpPostgresServer(config: McpPostgresServerConfig): Server {
  const server = new Server(
    {
      name: 'mcp-postgres-server',
      version: '0.1.0',
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    }
  );

  config.pool.max = config.pool.max || 10;

  config.pool.idleTimeoutMillis = config.pool.idleTimeoutMillis || 30000;

  config.pool.connectionTimeoutMillis = config.pool.connectionTimeoutMillis || 2000;

  config.pool.allowExitOnIdle = config.pool.allowExitOnIdle || true;

  const pool = new Pool(config.pool);

  const resourceBaseUrl = pool.options.connectionString;

  const SCHEMA_PATH = 'schema';

  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const client = await pool.connect();

    try {
      const result = await client.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
      );
      return {
        resources: result.rows.map(row => ({
          uri: new URL(`${row.table_name}/${SCHEMA_PATH}`, resourceBaseUrl).href,
          mimeType: 'application/json',
          name: `"${row.table_name}" database schema`,
        })),
      };
    } finally {
      client.release();
    }
  });

  server.setRequestHandler(ReadResourceRequestSchema, async request => {
    const resourceUrl = new URL(request.params.uri);

    const pathComponents = resourceUrl.pathname.split('/');

    const schema = pathComponents.pop();

    const tableName = pathComponents.pop();

    if (schema !== SCHEMA_PATH) {
      throw new Error('Invalid resource URI');
    }

    const client = await pool.connect();

    try {
      const result = await client.query(
        'SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1',
        [tableName]
      );

      return {
        contents: [
          {
            uri: request.params.uri,
            mimeType: 'application/json',
            text: JSON.stringify(result.rows, null, 2),
          },
        ],
      };
    } finally {
      client.release();
    }
  });

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'query',
          description: 'Run a read-only SQL query',
          inputSchema: {
            type: 'object',
            properties: {
              sql: { type: 'string' },
            },
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async request => {
    if (request.params.name === 'query') {
      const sql = request.params.arguments?.sql as string;

      const client = await pool.connect();

      try {
        await client.query('BEGIN TRANSACTION READ ONLY');

        const result = await client.query(sql);

        return {
          content: [{ type: 'text', text: JSON.stringify(result.rows, null, 2) }],
          isError: false,
        };
      } finally {
        client
          .query('ROLLBACK')
          .catch(error => console.warn('Could not roll back transaction:', error));

        client.release();
      }
    }
    throw new Error(`Unknown tool: ${request.params.name}`);
  });

  return server;
}

interface McpPostgresExpressEndpointConfig {
  app: Express;
  dbConfig: McpPostgresServerConfig;
  prefix: string;
}

export function createMcpPostgresExpressEndpoint(config: McpPostgresExpressEndpointConfig) {
  const { app, dbConfig, prefix } = config;

  app.post(prefix, async (req: Request, res: Response) => {
    try {
      const server = createMcpPostgresServer(dbConfig);

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });

      res.on('close', () => {
        transport.close();
        server.close();
      });

      await server.connect(transport);

      await transport.handleRequest(req, res, req.body);
    } catch {
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

  app.get(prefix, async (req: Request, res: Response) => {
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Method not allowed.',
        },
        id: null,
      })
    );
  });

  app.delete(prefix, async (req: Request, res: Response) => {
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Method not allowed.',
        },
        id: null,
      })
    );
  });

  console.log(
    `MCP Stateless Streamable HTTP Server initialize and accepting requests on: [POST] ${prefix}`
  );
}
