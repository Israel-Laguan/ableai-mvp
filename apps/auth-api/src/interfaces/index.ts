import { Infra } from '@models/auth';
import { Auth, Shared } from '@product-domain/backend';

export type CustomLoginInput = Auth.Infra.Firebase.Types.FirebaseLoginInput;

export type CustomLoginOutput = Auth.Infra.Firebase.Types.FirebaseLoginOutput;

export type LoginInput = Auth.Domain.Interfaces.LoginInput<CustomLoginInput>;

export type RegisterInput = Infra.RegisterInput;

export type RegisterOutput = Shared.Domain.Interfaces.FirebaseUserRecord;
