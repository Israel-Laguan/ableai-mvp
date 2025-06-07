import { Errors } from '@shared';
import { NextFunction, Request, Response } from 'express';

type Callback = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const tryCatchAndNext =
  (cb: Callback) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      if (error instanceof Errors.CustomError && error.statusCode !== 500) {
        const { message } = error;

        res.status(error.statusCode).json({
          message,
        });
        return next();
      }

      res.status(500).json({
        message: 'Internal Server Error',
      });

      return next(error);
    }
  };
