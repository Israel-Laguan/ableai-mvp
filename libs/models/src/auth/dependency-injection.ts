import { RegisterInput } from './infrastructure';

export type ThirdPartyEmailLinkServices = (input: Pick<RegisterInput, 'email'>) => Promise<{
  sendVerificationEmailLink: () => Promise<void>;
  rollbackThirdPartyEmailRegistration: () => Promise<void>;
}>;
