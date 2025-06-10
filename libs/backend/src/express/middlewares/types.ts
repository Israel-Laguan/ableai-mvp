import { NextFunction, Request, Response } from 'express';

export type AuthorizedRequest<UserCredentials extends object = object> = Request & {
  user?: UserCredentials;
};

export type ExpressHandlerAuthorizationMiddleware<UserCredentials extends object = object> = (
  req: AuthorizedRequest<UserCredentials>,
  res: Response,
  next: NextFunction
) => void;

export type ExpressHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => void;
