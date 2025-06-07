import { Request, Response, NextFunction } from 'express';

import { Shared } from '@product-domain/backend';

import { Errors } from '@shared';

import { ExpressHandlerMiddleware } from './types';

type AuthorizationMiddleware = ExpressHandlerMiddleware;

export const makeAuthorizationMiddleware =
  <TokenVerificationOutput>(
    verifyToken: Shared.Domain.Services.VerifyToken<TokenVerificationOutput>
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
