import { ZodType } from 'zod';

import { CONSTANTS } from '@shared';
import { NextFunction, Request, Response } from 'express';
import { ExpressHandlerMiddleware } from './types';

type ValidationInput = {
  bodySchema?: ZodType | null;
  querySchema?: ZodType | null;
  paramsSchema?: ZodType | null;
};

type ValidateInputMiddleware = (input: ValidationInput) => ExpressHandlerMiddleware;

const { HTTP_STATUS_CODE } = CONSTANTS;

export const validateInputMiddleware: ValidateInputMiddleware =
  ({ bodySchema, paramsSchema, querySchema }) =>
  (req: Request, res: Response, next: NextFunction) => {
    const errors = [];

    if (bodySchema) {
      const bodyResponse = bodySchema.safeParse(req.body);
      if (bodyResponse.error) {
        errors.push(bodyResponse.error);
      }

      req.body = bodyResponse.data;
    }

    if (paramsSchema) {
      const paramsResponse = paramsSchema.safeParse(req.params);
      if (paramsResponse.error) {
        errors.push(paramsResponse.error);
      }

      req.params = paramsResponse.data;
    }

    if (querySchema) {
      const queryResponse = querySchema.safeParse(req.query);
      if (queryResponse.error) {
        errors.push(queryResponse.error);
      }

      req.query = queryResponse.data;
    }

    if (errors.length) {
      const errorMessages = errors.map(error => {
        return error.issues.map(issue => {
          return {
            field: issue.path,
            message: issue.message,
          };
        });
      });
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(errorMessages);
    }

    return next();
  };
