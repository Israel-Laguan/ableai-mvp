import type { PrivateDataUser } from '@models/auth';
import type {
  MakeLoginUseCaseConfig,
  LogAttemptAndNextConfig,
  LogAttemptAndNextInputs,
} from '../domain/interfaces';
import type { LoginUseCase } from '../domain/use-cases';

import { Errors, CONSTANTS } from '@shared';
import { AUTH_ERROR_MESSAGES, LOGIN_STATUS_CODE } from '../domain/constants';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { DISABLED_PERM, ERROR, LOGIN, TO_MANY_ATTEMPTS, UNAUTHORIZED } = LOGIN_STATUS_CODE;

const {
  ACCOUNT_DISABLED_MESSAGE,
  DISABLED_PERM_MESSAGE,
  ERROR_MESSAGE,
  INVALID_CREDENTIALS_MESSAGE,
  TO_MANY_ATTEMPTS_MESSAGE,
} = AUTH_ERROR_MESSAGES;

const { throwError } = Errors.makeErrorRunner<
  Partial<LogAttemptAndNextInputs>,
  Exclude<LOGIN_STATUS_CODE, LOGIN_STATUS_CODE.LOGIN>
>({
  [DISABLED_PERM]: ({ blockId }) => {
    return Errors.ForbiddenError.create(
      JSON.stringify({
        error: ACCOUNT_DISABLED_MESSAGE,
        message: DISABLED_PERM_MESSAGE,
        blockId,
      }),
      'AUTH_LOGIN'
    );
  },

  [ERROR]: () => Errors.InternalServerError.create(ERROR_MESSAGE, 'AUTH_LOGIN'),

  [UNAUTHORIZED]: () => Errors.UnauthorizeError.create(INVALID_CREDENTIALS_MESSAGE, 'AUTH_LOGIN'),

  [TO_MANY_ATTEMPTS]: ({ retryAfter }) =>
    Errors.UnauthorizeError.create(
      JSON.stringify({ message: TO_MANY_ATTEMPTS_MESSAGE, retryAfter: retryAfter?.toUTCString() }),
      'AUTH_LOGIN'
    ),
});

const statusCodeStack = {
  [DISABLED_PERM]: HTTP_STATUS_CODE.FORBIDDEN,
  [ERROR]: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  [UNAUTHORIZED]: HTTP_STATUS_CODE.UNAUTHORIZED,
  [TO_MANY_ATTEMPTS]: HTTP_STATUS_CODE.UNAUTHORIZED,
  [LOGIN]: 200,
};

function makeLogAndResult({ IP, browser, device, os }: LogAttemptAndNextConfig) {
  return ({ loginStatus, blockId, retryAfter }: LogAttemptAndNextInputs): void | never => {
    console.log(
      `POST / [ LOGIN ATTEMPT ] : ${new Date().toUTCString()} status: ${
        statusCodeStack[loginStatus]
      }/${loginStatus} IP: ${IP} UserAgent: ${device} ${os} ${browser}`
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
  loginCooldown = 15 * 60 * 1000,
  maxLoginAttempts = 3,
  parseUserAgent,
  privateDataUserRepository,
  userRepository,
  runInLogin,
}: MakeLoginUseCaseConfig<CustomInput, CustomOutput>): LoginUseCase<CustomInput, CustomOutput> {
  return async input => {
    const { email, IP, userAgent } = input;

    const parsedUserAgent = parseUserAgent(userAgent);

    const logAndResult = makeLogAndResult({
      ...parsedUserAgent,
      IP,
    });

    const privateDataUser = (await privateDataUserRepository.getByEmail({ email }).catch(() => {
      logAndResult({
        loginStatus: ERROR,
      });
    })) as PrivateDataUser;

    const privateUserId = privateDataUser.id;

    if (!privateUserId) {
      logAndResult({ loginStatus: UNAUTHORIZED });
    }

    const [user] = await userRepository.getByPrivateDataUserId(privateUserId);

    if (!user) {
      logAndResult({ loginStatus: UNAUTHORIZED });
    }

    if (user.blockId) {
      logAndResult({
        loginStatus: DISABLED_PERM,
        blockId: user.blockId,
      });
    }

    const { loginAttempts = 0 } = user;

    if (loginAttempts >= maxLoginAttempts) {
      const canRetryAfter = new Date(user.updatedAt.getTime() + loginCooldown);

      if (new Date() < canRetryAfter) {
        logAndResult({
          loginStatus: TO_MANY_ATTEMPTS,
          retryAfter: new Date(new Date().getTime() - canRetryAfter.getTime()),
        });
      }
    }

    const runInLoginResult = (await runInLogin?.({
      ...input,
      logAndResultLogin: logAndResult,
      privateDataUser,
      privateDataUserRepository,
      user,
      userRepository,
    })) as CustomOutput;

    logAndResult({
      loginStatus: LOGIN,
    });

    if (loginAttempts > 0) {
      await userRepository.updateById(String(user.id), {
        loginAttempts: 0,
      });
    }

    return {
      user,
      privateDataUser,
      ...runInLoginResult,
    };
  };
}
