import { Shared } from '@product-domain/backend';

import { env } from '../config/env.config';

export const jwtService = Shared.Infra.makeJwtService(env.ENV_JWT_SECRET);
