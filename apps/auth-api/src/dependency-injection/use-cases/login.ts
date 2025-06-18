import { Auth } from '@product-domain/backend';
import { CustomLoginOutput } from '../../interfaces';
import { privateDataUserRepository, userRepository } from '../repositories';

const parseUserAgent = Auth.Infra.UaParseJs.parseUserAgent;

export const login = Auth.App.makeLoginUseCase<object, CustomLoginOutput>({
  parseUserAgent,
  privateDataUserRepository,
  userRepository,
});
