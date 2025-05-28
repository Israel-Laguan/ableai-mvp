# Overview

The **Payments API** is a RESTful service for managing payment-related data in the AbleAI platform. It provides endpoints for interacting with user and payment data, leveraging PostgreSQL databases and the Drizzle ORM for database access and migrations.

# Functionality

- Exposes REST endpoints for payment and user data operations.
- Connects to two PostgreSQL databases (`gig-db` and `private-gig-db`) using Drizzle.
- Runs database migrations automatically on startup for both databases.
- Uses environment-based configuration for flexible deployment.
- Modular and scalable Express.js setup.

# Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set environment variables:**
   - `NODE_ENV` (development | production | test)
   - `GIG_DB_URL` (PostgreSQL connection string for gig database)
   - `PRIVATE_GIG_DB_URL` (PostgreSQL connection string for private gig database)
   - `HOST` (optional, default: localhost)
   - `PORT` (optional, default: 3003)
3. **Run the server:**
   ```sh
   npx nx serve payments-api
   ```
4. **Open your browser or API client:**
   - Visit [http://localhost:3003/api/payments/v1](http://localhost:3003/api/payments/v1) (or your configured host/port).

# API Documentation

**Controller:**  
All routes are handled by the Drizzle-generated CRUD router, which interacts with the `users` table and other payment-related tables.

# Database Documentation

- **Databases:** PostgreSQL
  - `gig-db` (connection via `GIG_DB_URL`)
  - `private-gig-db` (connection via `PRIVATE_GIG_DB_URL`)
- **Tables:** `users` (mocked via Drizzle ORM for development), and payment-related tables.
- **Migrations:** Managed and run automatically on startup using Drizzle.
- **Connection:** Configured in `src/config/env.config.ts`
