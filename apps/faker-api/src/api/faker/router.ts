import { Router } from 'express';

import { fakerController } from './controller';

const { generateFakeUserData, generateFakeWorkers, removeFakeUserData } = fakerController;

const fakerRouter = Router();

fakerRouter.delete('/user/:userId', removeFakeUserData);
fakerRouter.post('/user', generateFakeUserData);
fakerRouter.post('/workers', generateFakeWorkers);

export default fakerRouter;
