import * as jwt from 'jsonwebtoken';

import type { VerifyToken } from '../../domain/services';

import { Errors } from '@shared';
import { JWT_ERROR_CODES } from '../../domain/constants';

const { TOKEN_EXPIRED } = JWT_ERROR_CODES;

const { throwError } = Errors.makeErrorRunner<undefined, string>({
  [TOKEN_EXPIRED]: () => Errors.UnauthorizeError.create('Token has expired', 'JWT_SERVICES'),
});

export const makeJwtService = (secret: string) => {
  const verifyToken: VerifyToken<string | jwt.JwtPayload> = (token: string) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return throwError((error as Error).message);
    }
  };

  return {
    createToken: <T extends object>(
      payload: T,
      expiresIn: jwt.SignOptions['expiresIn'] = '1 day'
    ) => {
      return jwt.sign(payload, secret, {
        expiresIn,
      });
    },
    verifyToken,
  };
};
