# Auth-API

## Overview

The `auth-api` is an authentication and user management service built with Express.js. It exposes RESTful endpoints for managing users and their private data, leveraging two separate PostgreSQL databases.

## Main Routes

All routes are prefixed with `/api/auth/v1`.

### Gig User Routes

- `GET /api/auth/v1/gig/users/:id` — Get user by ID
- `GET /api/auth/v1/gig/users` — List users (supports sorting, pagination, and filtering)
- `POST /api/auth/v1/gig/users` — Create a new user
- `PUT /api/auth/v1/gig/users/:id` — Update user by ID
- `DELETE /api/auth/v1/gig/users/:id` — Delete user by ID

### Private Gig User Routes

- `GET /api/auth/v1/private-gig/users/:id` — Get private data user by ID
- `GET /api/auth/v1/private-gig/users` — List private data users (supports sorting, pagination, and filtering)
- `POST /api/auth/v1/private-gig/users` — Create a new private data user
- `PUT /api/auth/v1/private-gig/users/:id` — Update private data user by ID
- `DELETE /api/auth/v1/private-gig/users/:id` — Delete private data user by ID

## Controllers

- **Gig Controller**: Handles all CRUD operations for users in the `gig` context.
- **PrivateGig Controller**: Handles all CRUD operations for users in the `private-gig` context.

## Databases

- **GIG_DB_URL**: Main user data is stored in a PostgreSQL database, accessed via the `gigDb` connection.
- **PRIVATE_GIG_DB_URL**: Private user data is stored in a separate PostgreSQL database, accessed via the `privateGigDb` connection.

## Functionality

- Runs database migrations automatically on startup for both databases.
- Provides robust error handling and JSON responses.
- Supports advanced query options for listing users (sorting, pagination, filtering).
- Uses environment variables for configuration and database connections.
