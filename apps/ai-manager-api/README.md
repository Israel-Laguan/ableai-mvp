# Overview

The **AI Manager API** is a RESTful service designed to manage AI assistants and facilitate AI-powered interactions with a PostgreSQL database. It provides endpoints for streaming MCP (Model Context Protocol) requests and generating responses using large language models (LLMs) with read-only database access.

# Functionality

- Exposes REST endpoints for AI assistant interactions and MCP streaming.
- Integrates with Google Generative AI for LLM-based responses.
- Provides secure, read-only access to a PostgreSQL database via MCP.
- Handles environment-based configuration and robust error handling.
- Modular dependency injection for server and LLM tool management.

# Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set environment variables:**
   - `HOST` (default: localhost)
   - `PORT` (default: 3002)
   - `NODE_ENV` (development | production | test)
   - `GIG_DB_URL` (PostgreSQL connection string)
   - `ENV_JWT_SECRET` (JWT secret)
   - `AI_API_KEY` (Google Generative AI API key)
   - `MCP_SERVER_URL` (MCP server URL)
3. **Run the server:**
   ```sh
    npx nx serve ai-manager-api
   ```

# API Documentation

All endpoints are prefixed with `/api/ai-manager/v1`.

## MCP Streaming
- **Route:** `POST /api/ai-manager/v1/mcp`
- **Description:** Streams MCP requests to the database using the configured MCP server.
- **Controller:** Provided by `makeStatelessStreamableMcpRouter` from the domain backend.

## Assistants
- **Route:** `POST /api/ai-manager/v1/assistants`
- **Description:** Generates an LLM-based response to a prompt, with read-only database access.
- **Controller:** Uses `generateLlmResponse` from the dependency injection layer.
- **Request Body:** `{ "prompt": "<your prompt>" }`
- **Response:** LLM-generated answer, possibly including database query results.

# Database Documentation

- **Database:** PostgreSQL (connection via `GIG_DB_URL`)
- **Access:** Read-only queries are allowed through the LLM assistant and MCP server.
- **MCP Server:** Managed by `gigDbMcpServer` (dependency-injection/mcp-servers.ts)
- **Security:** Only read-only operations are permitted by the LLM assistant.

---

For more details, see the source code in the `src/` directory and the environment configuration in `src/config/env.config.ts`.
