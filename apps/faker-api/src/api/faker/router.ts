import { Router } from 'express';

import { fakerController } from './controller';

const { generateFakeUserData, removeFakeUserData } = fakerController;

const fakerRouter = Router();

fakerRouter.post('/user', generateFakeUserData);
fakerRouter.delete('/user/:userId', removeFakeUserData);

export default fakerRouter;
