import { CustomError } from './custom-error';
import { HTTP_STATUS_CODE } from '../constants';

export class InternalServerError extends CustomError<typeof InternalServerError.CODE> {
  static CODE = 'INTERNAL_SERVER_ERROR';

  private constructor(msg: string, path = 'Unknown path error') {
    super(InternalServerError.CODE, msg, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, path);
  }

  static create(msg: string, path = 'Unknown path error'): InternalServerError {
    return new InternalServerError(msg, path);
  }
}
