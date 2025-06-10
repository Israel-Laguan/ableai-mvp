import { Infra } from '@models/auth';
import { Auth, Shared } from '@product-domain/backend';

export type LoginInputs = Auth.Domain.interfaces.LoginInputs;

export type RegisterInput = Infra.RegisterInput;

export type SendEmailInput = Auth.Domain.interfaces.SendEmailInput;

export type VerifyEmailInput = Auth.Domain.interfaces.VerifyEmailInput;

export type VerifyPhoneNumberInputs = Shared.Domain.Interfaces.FirebasePhoneVerificationInput;
