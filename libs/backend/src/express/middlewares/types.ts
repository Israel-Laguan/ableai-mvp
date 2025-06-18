import { NextFunction, Request, Response } from 'express';
import { AuthorizedRequest } from '../types';

export type ExpressHandlerAuthorizationMiddleware<UserCredentials extends object = object> = (
  req: AuthorizedRequest<UserCredentials>,
  res: Response,
  next: NextFunction
) => void;

export type ExpressHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => void;
