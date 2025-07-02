import { Express } from '@backend';
import { env } from '../../config/env.config';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 500;
const MAX_REQUESTS_MESSAGE = 'Too many requests, please try again later.';
const CODE = 'RATE_LIMIT_EXCEEDED';
const STATUS_CODE = 429;

export const limiterMiddleware = Express.Middlewares.makeRedisExpressRateLimiter({
  rateLimitConfig: {
    windowMs: WINDOW_MS,
    max: MAX_REQUESTS,
    message: {
      message: MAX_REQUESTS_MESSAGE,
      code: CODE,
      statusCode: STATUS_CODE,
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
