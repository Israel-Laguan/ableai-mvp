import { Express } from '@backend';

import router from './routes';
import { initDatabase } from './db/';
import { env } from './config/env.config';

const { HOST: host, PORT: port } = env;

initDatabase()
  .catch(err => {
    console.error('Error during startup:', err);
    process.exit(1);
  })
  .then(() => {
    const appName = 'Gig-API';
    const globalPrefix = '/api/gig/v1';
    const app = Express.makeExpressApp({
      router,
      appName,
      globalPrefix,
      //TODO: Should close db ?
      onClose: [],
    });
    app.listen(Number(port), host, () => {
      console.log(`::: [ ${appName} ready 🚀 ] http://${host}:${port}/${globalPrefix}`);
    });
  });
