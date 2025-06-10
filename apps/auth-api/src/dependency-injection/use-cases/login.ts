import { Auth } from '@product-domain/backend';
import { privateDataUserRepository, userRepository } from '../repositories';
import { jwtService } from '../services';

function generateTokenPair({ id, roleId }: Auth.Domain.interfaces.GenerateTokenPairInput) {
  const nowInSeconds = Math.floor(Date.now() / 1000);

  const accessToken = jwtService.createToken<
    Omit<Auth.Domain.interfaces.AccessTokenPayload, 'exp'>
  >(
    {
      id,
      roleId,
      type: 'access',
      iat: nowInSeconds,
    },
    nowInSeconds + 60 * 60 * 3
  );

  const refreshToken = jwtService.createToken<
    Omit<Auth.Domain.interfaces.RefreshTokenPayload, 'exp'>
  >(
    {
      id,
      type: 'refresh',
      iat: nowInSeconds,
    },
    nowInSeconds + 60 * 60 * 24 * 7
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}

const getGeoLocation = Auth.Infra.GeoLite.getGeoLocation;

const parseUserAgent = Auth.Infra.UaParseJs.parseUserAgent;

export const login = Auth.App.makeLoginUseCase({
  generateTokenPair,
  getGeoLocation,
  parseUserAgent,
  privateDataUserRepository,
  userRepository,
});
