import type { ExpressHandlerAuthorizationMiddleware } from './types';

import { Errors } from '@shared';

export const makeAuthorizationMiddleware =
  <TokenVerificationOutput extends object = object>(
    verifyToken: (token: string) => TokenVerificationOutput
  ): ExpressHandlerAuthorizationMiddleware<TokenVerificationOutput> =>
  (req, _, next) => {
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

      const decode = verifyToken(token);

      if (!decode) {
        throw Errors.UnauthorizeError.create('Token is not valid', path);
      }

      req.user = { ...decode };

      return next();
    } catch (error) {
      return next(error);
    }
  };
