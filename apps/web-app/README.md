# Overview

The **Web App** is a React-based frontend application designed as a starting point for building user interfaces within the AbleAI platform. It provides a modular structure and integrates with the product domain frontend library for shared UI components.

# Functionality

- Built with React and TypeScript.
- Modular component structure for easy scalability.
- Integrates with the product domain frontend library.
- Provides a welcoming landing page and a foundation for further web features.
- Ready for customization with CSS modules and additional components.

# Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npx nx serve web-app
   ```
3. **Open your browser:**
   - Visit [http://localhost:4200](http://localhost:4200) (or the port specified in your configuration).

# API Documentation

This project is a frontend web application and does not expose its own REST or GraphQL API. It is designed to consume APIs provided by the backend services in the AbleAI platform.

# Database Documentation

The web-app does not directly connect to a database. All data interactions are performed via API calls to backend services.
