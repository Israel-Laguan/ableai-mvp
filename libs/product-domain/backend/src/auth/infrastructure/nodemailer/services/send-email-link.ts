import * as nodemailer from 'nodemailer';
import { z } from 'zod';

import type { Services } from '../../../domain';
import { Infra, Domain } from '../../../../shared';

const { TRANSPORTER_ERROR } = Domain.Constants.NODEMAILER_ERROR_CODES;

interface NodemailerSendEmailLinkServiceConfig {
  createEmailToken: Services.CreateEmailToken;
  from: string;
  redirectUrl: string;
  transporter: nodemailer.Transporter;
}

const configSchema = z.object({
  createEmailToken: z
    .function()
    .args(z.object({ email: z.string().email() }))
    .returns(z.string()),
  from: z.string().email(),
  redirectUrl: z.string().url(),
  transporter: z.any(),
});

export function MakeNodemailerSendEmailLinkService(
  config: NodemailerSendEmailLinkServiceConfig
): Services.SendEmailLink {
  const { createEmailToken, from, redirectUrl, transporter } = configSchema.parse(config);

  return async ({ email }) => {
    const emailToken = createEmailToken({
      email,
    });

    const link = `${redirectUrl}?email=${encodeURIComponent(emailToken)}`;

    try {
      await transporter.sendMail({
        from,
        to: email,
        subject: 'Verify your email address',
        html: `<p>Click the link below to verify your email address:</p>
                 <a href="${link}">Verify Email</a>`,
      });
    } catch (error) {
      Infra.Nodemailer.Errors.throwError(TRANSPORTER_ERROR, { error });
    }
  };
}
