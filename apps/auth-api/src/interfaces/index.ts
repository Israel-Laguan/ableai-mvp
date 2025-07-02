import { Infra } from '@models/auth';
import { Auth } from '@product-domain/backend';

export type LoginInput = Auth.Domain.Interfaces.LoginInput;

export type RegisterInput = Infra.RegisterInput;

export type RegisterTransaction =
  Auth.Domain.Repositories.RegisterTransaction<Auth.Infra.Firebase.Types.FirebaseAddCustomClaimsDto>;

export type UpdateInput =
  Auth.Domain.Interfaces.UpdateInput<Auth.Infra.Firebase.Types.FirebaseUpdateInput>;

export type UpdateTransaction = Auth.Domain.Repositories.UpdateTransaction;
