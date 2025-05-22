import router from './routes';
import { initDatabase } from './db/';
import { makeExpressApp } from './core';
import { env } from './config/env.config';

const { HOST: host, PORT: port } = env;

initDatabase()
  .catch(err => {
    console.error('Error during startup:', err);
    process.exit(1);
  })
  .then(() => {
    const app = makeExpressApp(router);
    const globalPrefix = 'api/auth/v1';
    app.listen(Number(port), host, () => {
      console.log(`::: [ Auth-API ready 🚀 ] http://${host}:${port}/${globalPrefix}`);
    });
  });
