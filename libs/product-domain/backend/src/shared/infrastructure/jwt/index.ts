import { Services } from '@models/shared';
import * as jwt from 'jsonwebtoken';

export type TokenVerificationOutput = string | jwt.JwtPayload;

export const makeJwtService = (secret: string) => {
  const verifyToken: Services.VerifyTokenService<TokenVerificationOutput> = (token: string) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      console.info((error as Error).message);
      throw error;
    }
  };

  return {
    createToken: (payload: object) => {
      const oneDay = '1 day';
      return jwt.sign(payload, secret, {
        expiresIn: oneDay,
      });
    },
    verifyToken,
  };
};
