import * as jwt from 'jsonwebtoken';

import { Errors } from '@shared';
import { Services } from '@models/shared';

type ExpiresIn = jwt.SignOptions['expiresIn'];

export type TokenVerificationOutput = string | jwt.JwtPayload;

const { throwError } = Errors.makeErrorRunner({
  'jwt expired': () => Errors.UnauthorizeError.create('Token has expired', 'JWT_SERVICES'),
});

export const makeJwtService = (secret: string) => {
  const verifyToken: Services.VerifyTokenService<TokenVerificationOutput> = (token: string) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return throwError((error as Error).message);
    }
  };

  return {
    createToken: (payload: object, expiresIn: ExpiresIn = '1 day') => {
      return jwt.sign(payload, secret, {
        expiresIn,
      });
    },
    verifyToken,
  };
};
