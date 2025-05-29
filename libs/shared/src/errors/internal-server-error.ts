import { CustomError } from './custom-error';
import { HTTP_STATUS_CODE } from '../constants';

export class InternalServerError extends CustomError<typeof InternalServerError.CODE> {
  static CODE = 'FORBIDDEN_ERROR';

  private constructor(msg: string, path = 'Unknown path error', error?: unknown) {
    super(InternalServerError.CODE, msg, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, path);
    console.error(`Internal Server Error: ${msg}`);
    if (error) console.error('Error details:', error);
  }

  static create(msg: string, path = 'Unknown path error', error?: unknown): InternalServerError {
    return new InternalServerError(msg, path, error);
  }
}
