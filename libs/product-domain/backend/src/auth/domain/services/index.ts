import { Infra } from '@models/auth';
import { GenerateTokenPairInput, RunInLoginInput, TokenPair, UserAgent } from '../interfaces';

export type GenerateTokenPair = (input: GenerateTokenPairInput) => TokenPair | Promise<TokenPair>;

export type ParseUserAgent = (userAgent: string) => UserAgent;

export type RunInLogin<
  CustomOInput extends object = object,
  CustomOutput extends object = object
> = (input: RunInLoginInput<CustomOInput>) => Promise<CustomOutput>;

export type RunInRegister<R> = (input: Infra.RegisterInput) => Promise<R>;
