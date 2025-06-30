import { Infra } from '@models/auth';
import { Auth } from '@product-domain/backend';

export type CustomLoginInput = Auth.Infra.Firebase.Types.FirebaseLoginInput;

export type CustomLoginOutput = Auth.Infra.Firebase.Types.FirebaseLoginOutput;

export type LoginInput = Auth.Domain.Interfaces.LoginInput;

export type RegisterInput = Infra.RegisterInput;

export type RegisterTransaction =
  Auth.Domain.Repositories.RegisterTransaction<Auth.Infra.Firebase.Types.FirebaseAddCustomClaimsDto>;

export type SwitchAppRoleInput = UserClaims;

export type UpdateInput =
  Auth.Domain.Interfaces.UpdateInput<Auth.Infra.Firebase.Types.FirebaseUpdateInput>;

export type UpdateTransaction = Auth.Domain.Repositories.UpdateTransaction;
