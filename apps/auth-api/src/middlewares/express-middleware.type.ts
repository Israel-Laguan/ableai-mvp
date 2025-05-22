import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars
export type ExpressHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => void;
