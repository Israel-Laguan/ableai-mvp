import { Express } from '@backend';

import router from './routes';
import { env } from './config/env.config';
import { McpServers } from './dependency-injection';

const appName = 'Ai-Manager-API';

const { HOST: host, PORT: port } = env;

const { gigDbMcpServer } = McpServers;

const globalPrefix = '/api/ai-manager/v1';
const app = Express.makeExpressApp({
  router,
  appName,
  globalPrefix,
  onClose: [gigDbMcpServer.closePool],
});

app.listen(Number(port), host, () => {
  console.log(`::: [ ${appName} ready 🚀 ] http://${host}:${port}${globalPrefix}`);
});
