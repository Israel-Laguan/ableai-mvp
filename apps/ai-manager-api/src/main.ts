import { env } from './config/env.config';
import { makeExpressApp } from './core';
import { McpServers } from './dependency-injection';
import router, { globalPrefix } from './routes';

const appName = 'Ai-Manager-API';

const { HOST: host, PORT: port } = env;

const { gigDbMcpServer } = McpServers;

const app = makeExpressApp({
  router,
  appName,
  onClose: [gigDbMcpServer.closePool],
});

app.listen(Number(port), host, () => {
  console.log(`::: [ ${appName} ready 🚀 ] http://${host}:${port}${globalPrefix}`);
});
