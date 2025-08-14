import { Router } from 'express';

import { fakerController } from './controller';
import { Middlewares } from '../../dependency-injection';

const { generateFakeUserData, generateFakeWorkers, removeFakeUserData } = fakerController;

const fakerRouter = Router();

fakerRouter.delete('/user/:userId', removeFakeUserData);
fakerRouter.post('/user', generateFakeUserData);
fakerRouter.post('/workers', generateFakeWorkers);
fakerRouter.post(
  '/gig-works/payments',
  Middlewares.authorizationMiddleware,
  fakerController.generateFakeGigWorkPayments
);

export default fakerRouter;
