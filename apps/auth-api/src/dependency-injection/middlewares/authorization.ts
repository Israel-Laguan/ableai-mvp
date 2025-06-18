import { Express } from '@backend';
import { firebaseService } from '../services';

export const authorizationMiddleware = Express.Middlewares.makeAuthorizationMiddleware(
  firebaseService.authorization
);
