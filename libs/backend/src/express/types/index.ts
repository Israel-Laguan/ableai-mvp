import { Request } from 'express';

export type AuthorizedRequest<
  UserCredentials extends object = object,
  ReqParams extends Request['params'] = Request['params'],
  /* eslint-disable @typescript-eslint/no-explicit-any */
  ResBody extends object = any,
  ReqBody extends object = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
  /* eslint-enable @typescript-eslint/no-explicit-any */
> = Request<ReqParams, ResBody, ReqBody, ReqQuery, Locals> & {
  user?: UserCredentials;
};
