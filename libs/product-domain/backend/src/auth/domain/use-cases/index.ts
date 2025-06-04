import { LoginInputs, LoginUseCaseResult } from '../interfaces';

export type LoginUseCase = (input: LoginInputs) => Promise<LoginUseCaseResult>;
