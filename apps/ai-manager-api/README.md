# Overview

The **AI Manager API** is a RESTful service designed to manage AI assistants and facilitate AI-powered interactions with a PostgreSQL database. It provides endpoints for streaming MCP (Model Context Protocol) requests and generating responses using large language models (LLMs) with read-only database access.

**AI Assistant Database Query Flow**

The project now includes a flow for handling database queries through an AI assistant that leverages the Model Context Protocols (MCPs) provided by our backend. As illustrated in the diagram above, the process works as follows: the user submits a prompt, which is received by the LLM (Large Language Model). If the LLM determines that a function call is required, it sends a request to the backend server. The server processes the request and returns the result to the LLM. The LLM then generates a response for the user, sends it back to the server, and finally, the server delivers the LLM's response to the user. This architecture enables seamless and intelligent interaction with the databases via natural language prompts, ensuring a robust and extensible integration between the AI assistant and backend services.

<div align="center">
  <img src="./assets/readme/ableai-ai-assistants-mcp-flow.jpeg" alt="Ai assistants flow" width="500"/>
</div>

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

# Database Documentation

- **Database:** PostgreSQL (connection via `GIG_DB_URL`)
- **Access:** Read-only queries are allowed through the LLM assistant and MCP server.
- **MCP Server:** Managed by `gigDbMcpServer` (dependency-injection/mcp-servers.ts)
- **Security:** Only read-only operations are permitted by the LLM assistant.

---

For more details, see the source code in the `src/` directory and the environment configuration in `src/config/env.config.ts`.
