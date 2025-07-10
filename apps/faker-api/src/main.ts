import { Express } from '@backend';

import { gigDb, privateGigDb } from './db';
import router from './routes';
import { env } from './config/env.config';

const appName = 'Faker-API';

const { HOST: host, PORT: port } = env;

const globalPrefix = '/api/faker/v1';
const app = Express.makeExpressApp({
  router,
  appName,
  globalPrefix,
  onClose: [gigDb.$client.end, privateGigDb.$client.end],
});

app.listen(Number(port), host, () => {
  console.log(`::: [ ${appName} ready 🚀 ] http://${host}:${port}${globalPrefix}`);
});
