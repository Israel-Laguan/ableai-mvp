import { Infra } from '@models/auth';
import {
  LogAttemptAndNextInputs,
  RunInLoginInput,
  RunInRegisterOutput,
  UpdateInput,
  UserAgent,
} from '../interfaces';

export type logAndResultLogin = (input: LogAttemptAndNextInputs) => void | never;

export type ParseUserAgent = (userAgent: string) => UserAgent;

export type RunInLogin<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: RunInLoginInput<CustomInput>) => Promise<CustomOutput>;

export type RunInRegister<CustomOutput extends object = object> = (
  input: Infra.RegisterInput
) => Promise<RunInRegisterOutput<CustomOutput>>;

export type RunInUpdate<
  CustomInput extends object = object,
  CustomOutput extends object = object
> = (input: UpdateInput<CustomInput>) => Promise<RunInRegisterOutput<CustomOutput>>;
