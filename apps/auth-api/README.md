## Overview

The `auth-api` is an authentication and user management service built with Express.js. It exposes RESTful endpoints for managing users and their private data, leveraging two separate PostgreSQL databases.

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