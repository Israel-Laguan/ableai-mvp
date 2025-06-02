import { Shared } from '@product-domain/backend';
import { env } from '../../config/env.config';

export const sendEmailLinkService: Shared.Domain.DependencyInjection.Services.SendEmailLinkService =
  Shared.Infra.Nodemailer.makeNodemailerSendEmailLinkService({
    pass: env.EMAIL_CREDENTIALS.pass,
    user: env.EMAIL_CREDENTIALS.user,
  });
