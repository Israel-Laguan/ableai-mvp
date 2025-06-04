import { Infra } from '@models/auth';
import { UserAgent } from '../interfaces';

export type CreateEmailToken = (input: Pick<Infra.RegisterInput, 'email'>) => string;

export type GetGeoLocation = (IP: string) => Promise<string>;

export type ParseUserAgent = (userAgent: string) => UserAgent;

export type SendEmailLink = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type VerifyPassword = (token: string) => boolean;
