import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express, { Application, Router } from 'express';

import { router as HealthRouter } from './api/health';

interface AppConfig {
  router: Router;
  appName?: string;
  globalPrefix: string;
  onClose?: (() => Promise<void>)[];
}

export const makeExpressApp = ({
  appName,
  router,
  globalPrefix,
  onClose = [],
}: AppConfig): Application => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.disable('x-powered-by');

  // Router
  app.use(globalPrefix, router);
  app.use(globalPrefix, HealthRouter);

  process.on('unhandledRejection', error => {
    console.error(error);
    process.exit(1);
  });

  process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
  });

  const closeSignals = ['SIGTERM', 'SIGINT', 'SIGUSR2', 'SIGQUIT'];

  closeSignals.forEach(s =>
    process.on(s, async () => {
      if (onClose.length > 0) {
        await Promise.allSettled(onClose.map(fn => fn()));
      }
      console.log(`'${appName ?? 'application'}' is shutting down...`);

      process.exit(0);
    })
  );

  return app;
};
