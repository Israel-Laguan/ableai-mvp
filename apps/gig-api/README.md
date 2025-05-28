# Overview

The **Gig API** is a RESTful service for managing user data in the AbleAI platform. It provides CRUD operations for users, leveraging a PostgreSQL database and the Drizzle ORM for database access and migrations.

# Functionality

- Exposes REST endpoints for user CRUD operations.
- Connects to a PostgreSQL database using Drizzle.
- Runs database migrations automatically on startup.
- Uses environment-based configuration for flexible deployment.
- Modular and scalable Express.js setup.

# Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set environment variables:**
   - `NODE_ENV` (development | production | test)
   - `GIG_DB_URL` (PostgreSQL connection string)
   - `HOST` (optional, default: localhost)
   - `PORT` (optional, default: 3000)
3. **Run the server:**
   ```sh
   npx nx serve gig-api
   ```
4. **Open your browser or API client:**
   - Visit [http://localhost:3000/api/gig/v1/gig/users](http://localhost:3000/api/gig/v1/gig/users) (or your configured host/port).

# API Documentation

**Controller:**  
All routes are handled by the Drizzle-generated CRUD router, which interacts with the `users` table.

# Database Documentation

- **Database:** PostgreSQL (connection via `GIG_DB_URL`)
- **Table:** `users` (mocked via Drizzle ORM for development)
- **Migrations:** Managed and run automatically on startup using Drizzle.
- **Connection:** Configured in `src/config/env.config.ts`
