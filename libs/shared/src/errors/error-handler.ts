import { UnauthorizeError, AlreadyExistError, BadRequestError, NotFoundResourceError } from './';

// TODO: Repair LINETER FOR Types
export type ErrorHandler = {
  // eslint-disable-next-line no-unused-vars
  unauthorized: (message: string, path?: string) => Error;
  // eslint-disable-next-line no-unused-vars
  alreadyExist: (message: string, path?: string) => Error;
  // eslint-disable-next-line no-unused-vars
  badRequest: (message: string, path?: string) => Error;
  // eslint-disable-next-line no-unused-vars
  notFound: (message: string, path?: string) => Error;
};

// TODO: Repair LINT FOR Types
// eslint-disable-next-line no-redeclare
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
};
