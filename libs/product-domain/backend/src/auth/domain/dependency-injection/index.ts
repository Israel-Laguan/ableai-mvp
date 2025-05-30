import { Infra } from '@models/auth';

export type ThirdPartyEmailLinkServices = (input: Pick<Infra.RegisterInput, 'email'>) => Promise<{
  sendVerificationEmailLink: () => Promise<void>;
  rollbackThirdPartyEmailRegistration: () => Promise<void>;
}>;
