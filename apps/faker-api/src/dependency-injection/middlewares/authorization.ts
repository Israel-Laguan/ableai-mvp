import { Express } from '@backend';
import { firebaseService } from '../services';

const {
  Middlewares: { makeAuthorizationMiddleware },
} = Express;

export const authorizationMiddleware = makeAuthorizationMiddleware(firebaseService.authorization);
