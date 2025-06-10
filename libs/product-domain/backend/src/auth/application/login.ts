import { compare } from 'bcrypt';

import type { PrivateDataUser } from '@models/auth';
import type { LoginStatusKeys } from '../domain/constants';
import type {
  MakeLoginUseCaseConfig,
  LogAttemptAndNextConfig,
  LogAttemptAndNextInputs,
} from '../domain/interfaces';
import type { LoginUseCase } from '../domain/use-cases';

import { USER_STATUS } from '@models/auth';
import { Errors, CONSTANTS } from '@shared';
import { AUTH_ERROR_MESSAGES, LOGIN_STATUS_CODE } from '../domain/constants';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { DISABLED_PERM, ERROR, LOGIN, NOT_VERIFIED, TO_MANY_ATTEMPTS, UNAUTHORIZED } =
  LOGIN_STATUS_CODE;

const {
  ACCOUNT_DISABLED_MESSAGE,
  DISABLED_PERM_MESSAGE,
  ERROR_MESSAGE,
  GEOLOCATION_ERROR_MESSAGE,
  INVALID_CREDENTIALS_MESSAGE,
  TO_MANY_ATTEMPTS_MESSAGE,
} = AUTH_ERROR_MESSAGES;

const makeUnauthorizedError = () =>
  Errors.UnauthorizeError.create(INVALID_CREDENTIALS_MESSAGE, 'AUTH_LOGIN');

const { throwError } = Errors.makeErrorRunner<
  Partial<LogAttemptAndNextInputs>,
  Exclude<LoginStatusKeys, 'ENABLE' | 'LOGIN'>
>({
  [DISABLED_PERM]: ({ blockId }) => {
    return Errors.ForbiddenError.create(
      JSON.stringify({
        error: ACCOUNT_DISABLED_MESSAGE,
        message: `${DISABLED_PERM_MESSAGE}: ${blockId}.`,
      }),
      'AUTH_LOGIN'
    );
  },

  [ERROR]: () => Errors.InternalServerError.create(ERROR_MESSAGE, 'AUTH_LOGIN'),

  [UNAUTHORIZED]: makeUnauthorizedError,

  [NOT_VERIFIED]: makeUnauthorizedError,

  [TO_MANY_ATTEMPTS]: ({ retryAfter }) =>
    Errors.UnauthorizeError.create(
      `${TO_MANY_ATTEMPTS_MESSAGE}
      Can retry after: ${retryAfter?.toUTCString()}
      `,
      'AUTH_LOGIN'
    ),
});

const statusCodeStack = {
  [DISABLED_PERM]: HTTP_STATUS_CODE.FORBIDDEN,
  [ERROR]: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  [UNAUTHORIZED]: HTTP_STATUS_CODE.UNAUTHORIZED,
  [NOT_VERIFIED]: HTTP_STATUS_CODE.UNAUTHORIZED,
  [TO_MANY_ATTEMPTS]: HTTP_STATUS_CODE.UNAUTHORIZED,
  [LOGIN]: 200,
};

function makeLogAndResult({ IP, browser, device, geoLocation, os }: LogAttemptAndNextConfig) {
  return ({ loginStatus, blockId, retryAfter }: LogAttemptAndNextInputs) => {
    console.log(
      `POST / [ LOGIN ATTEMPT ] : ${new Date().toUTCString()} status: ${
        statusCodeStack[loginStatus]
      }/${loginStatus} IP: ${IP} UserAgent: ${device} ${os} ${browser} GeoLocation: ${geoLocation}`
    );

    if (loginStatus !== LOGIN) {
      throwError(loginStatus, { blockId, retryAfter });
    }

    return;
  };
}

export function makeLoginUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
>({
  getGeoLocation,
  generateTokenPair,
  parseUserAgent,
  privateDataUserRepository,
  userRepository,
  runInLogin,
}: MakeLoginUseCaseConfig<CustomInput, CustomOutput>): LoginUseCase<CustomInput, CustomOutput> {
  return async input => {
    const { email, password: currentPassword, IP, userAgent } = input;

    const parsedUserAgent = parseUserAgent(userAgent);

    const geoLocation = await getGeoLocation(IP).catch(() => {
      return GEOLOCATION_ERROR_MESSAGE;
    });

    const logAndResult = makeLogAndResult({
      ...parsedUserAgent,
      geoLocation,
      IP,
    });

    const { id: privateUserId } = (await privateDataUserRepository
      .getByEmail({ email })
      .catch(() => {
        logAndResult({
          loginStatus: ERROR,
        });
      })) as PrivateDataUser;

    if (!privateUserId) {
      logAndResult({ loginStatus: UNAUTHORIZED });
    }

    const [
      {
        id: userId,
        enabled,
        password: storedPassword,
        loginAttempts = 0,
        blockId,
        updatedAt,
        lastAppRole,
        roleId,
      },
    ] = await userRepository.getByPrivateDataUserId(privateUserId);

    const stringifyUserId = String(userId);

    if (enabled === USER_STATUS.TO_MANY_ATTEMPTS) {
      const canRetryAfter = new Date(updatedAt.getTime() + 15 * 60 * 1000);

      if (new Date() > canRetryAfter) {
        await userRepository.updateById(stringifyUserId, {
          loginAttempts: 0,
        });
      } else {
        logAndResult({
          loginStatus: TO_MANY_ATTEMPTS,
          retryAfter: new Date(new Date().getTime() - canRetryAfter.getTime()),
        });
      }
    }

    if (loginAttempts >= 3) {
      await userRepository.updateById(stringifyUserId, {
        enabled: USER_STATUS.TO_MANY_ATTEMPTS,
      });

      logAndResult({
        loginStatus: TO_MANY_ATTEMPTS,
        retryAfter: new Date(new Date().getTime() + 15 * 60 * 1000),
      });
    }

    if (enabled !== USER_STATUS.ENABLE) {
      logAndResult({
        loginStatus: enabled,
        blockId,
      });
    }

    const isValidPassword = compare(currentPassword, storedPassword);

    if (!isValidPassword) {
      await userRepository.updateById(stringifyUserId, {
        loginAttempts: loginAttempts + 1,
      });

      logAndResult({
        loginStatus: UNAUTHORIZED,
      });
    }

    if (loginAttempts > 0) {
      await userRepository.updateById(stringifyUserId, {
        loginAttempts: 0,
      });
    }

    const runInLoginResult = (await runInLogin?.({
      ...input,
      userRepository,
      privateDataUserRepository,
    })) as CustomOutput;

    logAndResult({
      loginStatus: LOGIN,
    });

    const { accessToken, refreshToken } = await generateTokenPair({
      id: userId,
      roleId,
    });

    return {
      lastAppRole,
      accessToken,
      refreshToken,
      ...runInLoginResult,
    };
  };
}
