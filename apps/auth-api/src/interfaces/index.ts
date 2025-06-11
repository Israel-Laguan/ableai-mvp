import { Infra } from '@models/auth';
import { Auth, Shared } from '@product-domain/backend';

export type LoginInput = Auth.Domain.interfaces.LoginInput;

export type RegisterInput = Infra.RegisterInput;

export type RegisterOutput = Shared.Domain.Interfaces.FirebaseUserRecord;
