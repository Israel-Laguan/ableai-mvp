import { CustomError } from './custom-error';
import { HTTP_STATUS_CODE } from '../constants';

export class ForbiddenError extends CustomError<typeof ForbiddenError.CODE> {
  static CODE = 'FORBIDDEN_ERROR';

  private constructor(msg: string, path = 'Unknown path error') {
    super(ForbiddenError.CODE, msg, HTTP_STATUS_CODE.FORBIDDEN, path);
  }

  static create(msg: string, path = 'Unknown path error'): ForbiddenError {
    return new ForbiddenError(msg, path);
  }
}
