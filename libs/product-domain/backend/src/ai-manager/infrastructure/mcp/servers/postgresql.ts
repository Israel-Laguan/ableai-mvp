import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Pool, PoolConfig } from 'pg';

interface ExtendedServer extends Server {
  closePool?: () => Promise<void>;
}

interface ServerConfig {
  poolConfig: PoolConfig;
  environment?: string;
}

/**
 * Creates a Model Context Protocol (MCP) server for PostgreSQL.
 *
 * This server is configured to allow only read-only operations.
 * No data modification (INSERT, UPDATE, DELETE) is permitted through this server.
 *
 * @param config - Configuration for the MCP PostgreSQL server.
 * @returns The configured MCP server.
 */
export function makeMcpPostgresServer({
  poolConfig,
  environment = 'production',
}: ServerConfig): ExtendedServer {
  const server: ExtendedServer = new Server(
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

  const pool = new Pool(poolConfig);

  server.closePool = async () => {
    await pool.end();
  };

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
    } catch (error) {
      if (environment === 'development') console.error('Error fetching resources:', error);
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
    } catch (error) {
      if (environment === 'development') console.error('Error fetching resources:', error);
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
      } catch (error) {
        if (environment === 'development') console.error('Error fetching resources:', error);
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
