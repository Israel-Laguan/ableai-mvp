import type { ExpressHandlerAuthorizationMiddleware } from './types';

import { Errors } from '@shared';

export const makeAuthorizationMiddleware =
  <UserCredentials extends object = object>(
    verifyToken: (token: string) => Promise<UserCredentials>
  ): ExpressHandlerAuthorizationMiddleware<UserCredentials> =>
  async (req, _, next) => {
    const path = 'AUTHORIZATION_MIDDLEWARE';
    try {
      const header = req.headers['authorization'] || false;

      if (!header) {
        throw Errors.UnauthorizeError.create('Token is not valid', path);
      }

      const [type, token] = header.split(' ');
      if (!type || type.toLowerCase() !== 'bearer' || !token) {
        throw Errors.UnauthorizeError.create('Token is not valid', path);
      }

      const decode = await verifyToken(token);

      if (!decode) {
        throw Errors.UnauthorizeError.create('Token is not valid', path);
      }

      req.user = { ...decode };

      return next();
    } catch (error) {
      return next(error);
    }
  };
