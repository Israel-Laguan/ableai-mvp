import cors from 'cors';
import helmet from 'helmet';
import express, { Application, Router } from 'express';

interface AppConfig {
  router: Router;
  appName?: string;
  onClose?: (() => Promise<void>)[];
}

export const makeExpressApp = ({ appName, router, onClose = [] }: AppConfig): Application => {
  const app = express();

  app.use(helmet());
  app.disable('x-powered-by');

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(router);

  process.on('unhandledRejection', error => {
    console.error(error);
    process.exit(1);
  });

  process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
  });

  const closeSignals = ['SIGTERM', 'SIGINT', 'SIGUSR2', 'SIGQUIT'];

  let isClosing = false;

  closeSignals.forEach(s =>
    process.on(s, async () => {
      if (isClosing) return;

      isClosing = true;

      try {
        if (onClose.length > 0) {
          await Promise.all(onClose.map(fn => fn()));
        }
      } catch (err) {
        console.error(`An error occurred while shutting down '${appName ?? 'application'}':`, err);
      }

      console.log(`'${appName ?? 'application'}' shut down gracefully.`);

      process.exit(0);
    })
  );

  return app;
};
