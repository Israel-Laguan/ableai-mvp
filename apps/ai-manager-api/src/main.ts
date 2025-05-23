import router, { globalPrefix } from './routes';
import { makeExpressApp } from './core';
import { env } from './config/env.config';

const { HOST: host, PORT: port } = env;

const app = makeExpressApp(router);

app.listen(Number(port), host, () => {
  console.log(`::: [ Auth-API ready 🚀 ] http://${host}:${port}${globalPrefix}`);
});
