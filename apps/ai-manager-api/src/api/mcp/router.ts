import { Router } from 'express';

import { MCPController } from './controller';

const { handleRequest } = MCPController;

const MCPRouter = Router();

// TODO: add authorization middlewares
MCPRouter.post('/mcp', handleRequest);

export default MCPRouter;
