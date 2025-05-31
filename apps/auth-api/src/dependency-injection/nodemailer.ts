import { Shared } from '@product-domain/backend';
import { env } from '../config/env.config';

export const sendEmailService: Shared.Domain.DependencyInjection.SendEmailService =
  Shared.Infra.Nodemailer.makeNodemailerSendEmailService({
    pass: env.EMAIL_CREDENTIALS.pass,
    user: env.EMAIL_CREDENTIALS.user,
  });
