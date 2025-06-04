import {
  UnauthorizeError,
  AlreadyExistError,
  BadRequestError,
  NotFoundResourceError,
  InternalServerError,
} from './';

export type ErrorHandler = {
  unauthorized: (message: string, path?: string) => Error;
  alreadyExist: (message: string, path?: string) => Error;
  badRequest: (message: string, path?: string) => Error;
  notFound: (message: string, path?: string) => Error;
  internalServerError: (message: string, path?: string) => Error;
};

export const ErrorHandler: ErrorHandler = {
  unauthorized(message, path) {
    return UnauthorizeError.create(message, path);
  },
  alreadyExist(message, path) {
    return AlreadyExistError.create(message, path);
  },
  badRequest(message, path) {
    return BadRequestError.create(message, path);
  },
  notFound(message, path) {
    return NotFoundResourceError.create(message, path);
  },
  internalServerError(message, path) {
    return InternalServerError.create(message, path);
  },
};

export function makeErrorRunner<TErrorInputs>(
  errorStack: Record<string, (errorInputs: TErrorInputs) => Error>
) {
  return {
    throwError: (errorCode: string, errorInputs?: TErrorInputs): never => {
      throw (
        errorStack[errorCode]?.(errorInputs || ({} as TErrorInputs)) ||
        InternalServerError.create(`Unknown error`, 'ERROR_HANDLER')
      );
    },
  };
}
