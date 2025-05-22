import cors from 'cors';
import helmet from 'helmet';
import express, { Application, Router } from 'express';

export const makeExpressApp = (routes: Router): Application => {
  const app = express();

  app.use(helmet());
  app.disable('x-powered-by');

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(routes);

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
      // TODO: Here close client como dbs
      process.exit(0);
    })
  );

  return app;
};
