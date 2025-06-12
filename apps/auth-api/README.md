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

## Configuration

The following environment variables are required for the `auth-api` application:

- **NODE_ENV**: Specifies the environment (development, production, or test).
- **GIG_DB_URL**: Connection string for the main PostgreSQL database (gig context).
- **PRIVATE_GIG_DB_URL**: Connection string for the private PostgreSQL database (private-gig context).
- **ENV_JWT_SECRET**: Secret key used for JWT authentication.
- **GOOGLE_APPLICATION_CREDENTIALS**: Base64-encoded JSON string with Google Cloud service account credentials for Firebase integration.
- **REDIRECT_AFTER_REGISTER_URL**: URL to redirect users after successful registration.
- **EMAIL_CREDENTIALS**: Base64-encoded JSON string with email credentials (user and pass) for sending emails.

Make sure all these variables are set in your environment before starting the application.

