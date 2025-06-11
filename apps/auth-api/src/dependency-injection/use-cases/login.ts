import { Auth } from '@product-domain/backend';
import { CustomLoginOutput } from '../../interfaces';
import { privateDataUserRepository, userRepository } from '../repositories';
import { firebaseService } from '../services';

const parseUserAgent = Auth.Infra.UaParseJs.parseUserAgent;

export const login = Auth.App.makeLoginUseCase<object, CustomLoginOutput>({
  parseUserAgent,
  privateDataUserRepository,
  runInLogin: firebaseService.login,
  userRepository,
});
