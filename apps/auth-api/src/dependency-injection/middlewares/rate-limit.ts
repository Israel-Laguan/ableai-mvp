import { Express } from '@backend';
import { env } from '../../config/env.config';

export const limiterMiddleware = Express.Middlewares.makeRedisExpressRateLimiter({
  rateLimitConfig: {
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
      message: 'Too many requests, please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
      statusCode: 429,
    },
    standardHeaders: true,
    legacyHeaders: false,
  },
  redisClientConfig: {
    url: `redis://${env.REDIS_HOST || 'localhost'}:${env.REDIS_PORT || '6379'}`,
  },
});
