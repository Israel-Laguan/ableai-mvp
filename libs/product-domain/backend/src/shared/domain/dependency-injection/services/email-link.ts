import { Infra } from '@models/auth';

export type SendEmailLink = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type CreateEmailToken = (input: Pick<Infra.RegisterInput, 'email'>) => string;
