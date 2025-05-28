# Overview

The **Dashboard** application is a React-based frontend built to provide a user interface for the AbleAI platform. It serves as the main entry point for users to interact with various features and services offered by the backend APIs.

# Functionality

- Built with React and TypeScript.
- Uses a modular component structure for scalability.
- Integrates with the product domain frontend library for shared UI components.
- Provides a welcoming landing page and a foundation for further dashboard features.
- Includes basic testing setup with Jest and React Testing Library.

# Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npx nx serve dashboard
   ```
3. **Open your browser:**
   - Visit [http://localhost:4200](http://localhost:4200) (or the port specified in your configuration).

# API Documentation

This project is a frontend dashboard and does not expose its own REST or GraphQL API. It is designed to consume APIs provided by the backend services in the AbleAI platform.

# Database Documentation

The dashboard application does not directly connect to a database. All data interactions are performed via API calls to backend services.
