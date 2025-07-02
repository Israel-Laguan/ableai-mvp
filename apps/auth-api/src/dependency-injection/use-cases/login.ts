import { Auth } from '@product-domain/backend';
import { privateDataUserRepository, userRepository } from '../repositories';

const parseUserAgent = Auth.Infra.UaParseJs.parseUserAgent;

export const login = Auth.App.makeLoginUseCase({
  parseUserAgent,
  privateDataUserRepository,
  userRepository,
});
