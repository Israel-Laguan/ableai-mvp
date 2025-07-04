import { Router } from 'express';

import assistantsRouter from '../api/assistant/router';
import mcpRouter from '../api/mcp/router';

const apiV1 = Router();

apiV1.use(assistantsRouter);
apiV1.use(mcpRouter);

export default apiV1;
