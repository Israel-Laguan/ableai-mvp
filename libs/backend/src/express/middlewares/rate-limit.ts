import type { Options } from 'express-rate-limit';

import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { createClient } from 'redis';

import { Errors } from '@shared';

const throwInternalServerError = (err: Error): never => {
  throw Errors.InternalServerError.create(
    err instanceof Error ? err.message : err,
    'RATE_LIMITER_CONNECTION_ERROR'
  );
};

interface RateLimiterConfig {
  rateLimitConfig: Partial<Options>;
  redisClientConfig: Parameters<typeof createClient>[0];
}

export function makeRedisExpressRateLimiter({
  rateLimitConfig,
  redisClientConfig,
}: RateLimiterConfig) {
  const redisClient = createClient(redisClientConfig);

  redisClient.on('connect', () => console.log('Connecting to Redis for Rate Limiter'));
  redisClient.on('error', throwInternalServerError);
  redisClient.connect().catch(throwInternalServerError);

  const redisStore = new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  });

  return rateLimit({
    ...rateLimitConfig,
    store: redisStore,
  });
}
