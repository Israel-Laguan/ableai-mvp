import { Infra } from '@models/auth';
import { LogAttemptAndNextInputs, RunInLoginInput, UserAgent } from '../interfaces';

export type logAndResultLogin = (input: LogAttemptAndNextInputs) => void | never;

export type ParseUserAgent = (userAgent: string) => UserAgent;

export type RunInLogin<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: RunInLoginInput<CustomInput>) => Promise<CustomOutput>;

export type RunInRegister<R> = (input: Infra.RegisterInput) => Promise<R>;
