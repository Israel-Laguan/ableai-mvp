import * as nodemailer from 'nodemailer';

import { Auth } from '@product-domain/backend';
import { env } from '../../config/env.config';
import { jwtService } from '.';

export const NodemailerService = {
  sendEmailLink: Auth.Infra.Nodemailer.Services.MakeNodemailerSendEmailLinkService({
    createEmailToken: (input: { email: string }) => jwtService.createToken(input, '1 hour'),
    from: env.EMAIL_CREDENTIALS.user,
    redirectUrl: env.REDIRECT_AFTER_REGISTER_URL,
    transporter: nodemailer.createTransport({
      service: env.EMAIL_CREDENTIALS.service,
      auth: {
        user: env.EMAIL_CREDENTIALS.user,
        pass: env.EMAIL_CREDENTIALS.pass,
      },
    }),
  }),
};
