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

const { ERROR, LOGIN, UNAUTHORIZED } = LOGIN_STATUS_CODE;

const { ERROR_MESSAGE, INVALID_CREDENTIALS_MESSAGE } = AUTH_ERROR_MESSAGES;

const { throwError } = Errors.makeErrorRunner<
  Partial<LogAttemptAndNextInputs>,
  Exclude<LOGIN_STATUS_CODE, LOGIN_STATUS_CODE.LOGIN>
>({
  [ERROR]: () => Errors.InternalServerError.create(ERROR_MESSAGE, 'AUTH_LOGIN'),

  [UNAUTHORIZED]: () => Errors.UnauthorizeError.create(INVALID_CREDENTIALS_MESSAGE, 'AUTH_LOGIN'),
});

const statusCodeStack = {
  [ERROR]: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  [UNAUTHORIZED]: HTTP_STATUS_CODE.UNAUTHORIZED,
  [LOGIN]: 200,
};

function makeLogAndResult({ IP, browser, device, os }: LogAttemptAndNextConfig) {
  return ({ loginStatus, retryAfter }: LogAttemptAndNextInputs): void | never => {
    console.log(
      `POST / [ LOGIN ATTEMPT ] : ${new Date().toUTCString()} status: ${
        statusCodeStack[loginStatus]
      }/${loginStatus} IP: ${IP} UserAgent: ${device} ${os} ${browser}`
    );

    if (loginStatus !== LOGIN) {
      throwError(loginStatus, { retryAfter });
    }

    return;
  };
}

export function makeLoginUseCase<
  CustomInput extends object = object,
  CustomOutput extends object = object
>({
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

    return {
      user,
      privateDataUser,
      ...runInLoginResult,
    };
  };
}
