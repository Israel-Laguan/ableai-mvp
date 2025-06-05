import { Infra } from '@models/auth';
import { LoginInputs, LoginUseCaseResult } from '../interfaces';

export type VerifyEmailUseCase = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<void>;

export type LoginUseCase = (input: LoginInputs) => Promise<LoginUseCaseResult>;

export type RegisterUseCase = (input: Infra.RegisterInput) => Promise<void>;
