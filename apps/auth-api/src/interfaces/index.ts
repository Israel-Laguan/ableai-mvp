import { Infra } from '@models/auth';
import { Auth, Shared } from '@product-domain/backend';

export type FirebaseCustomToken = Shared.Domain.Interfaces.FirebaseCustomToken;

export type LoginInputs = Auth.Domain.interfaces.LoginInputs;

export type RegisterInput = Infra.RegisterInput;

export type SendEmailInput = Auth.Domain.interfaces.SendEmailInput;

export type verifyPhoneNumberInputs =
  Auth.Domain.interfaces.VerifyPhoneNumberInputs<FirebaseCustomToken>;
