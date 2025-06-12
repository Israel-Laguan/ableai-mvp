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
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    socket: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
  },
});
