import { Express } from '@backend';

import { env } from './config/env.config';
import { initDatabase, gigDb, privateGigDb } from './db';
import router from './routes';

const { HOST: host, PORT: port } = env;

initDatabase()
  .catch(err => {
    console.error('Error during startup:', err);
    process.exit(1);
  })
  .then(() => {
    const appName = 'Auth-API';
    const globalPrefix = '/api/auth/v1';
    const app = Express.makeExpressApp({
      router,
      appName,
      globalPrefix,
      onClose: [gigDb.$client.end, privateGigDb.$client.end],
    });
    app.listen(Number(port), host, () => {
      console.log(`::: [ ${appName} ready 🚀 ] http://${host}:${port}/${globalPrefix}`);
    });
  });
