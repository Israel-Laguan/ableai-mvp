import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars
type Callback = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const tryCatchAndNext =
  (cb: Callback) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
