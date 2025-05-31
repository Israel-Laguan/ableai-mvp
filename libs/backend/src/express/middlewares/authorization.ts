import { Request, Response, NextFunction } from 'express';

import { Errors } from '@shared';
import { Services } from '@models/shared';
import { ExpressHandlerMiddleware } from './types';

type AuthorizationMiddleware = ExpressHandlerMiddleware;

export const makeAuthorizationMiddleware =
  <TTokenVerificationOutput>(
    verifyToken: Services.VerifyTokenService<TTokenVerificationOutput>
  ): AuthorizationMiddleware =>
  (req: Request, _: Response, next: NextFunction) => {
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

      return next();
    } catch (error) {
      return next(error);
    }
  };
