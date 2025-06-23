import { Request } from 'express';

export type AuthorizedRequest<UserCredentials extends object = object> = Request & {
  user?: UserCredentials;
};
