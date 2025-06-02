import * as nodemailer from 'nodemailer';

import { Errors } from '@shared';
import { DependencyInjection } from '../../domain';

const { throwError } = Errors.makeErrorRunner({
  'transporter-error': (message: string) =>
    Errors.InternalServerError.create(message, 'NODEMALIER_ERROR'),
});

export function makeNodemailerSendEmailLinkService({
  pass,
  user,
}: {
  user: string;
  pass: string;
}): DependencyInjection.Services.SendEmailLinkService {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });

  return async ({ to, link }) => {
    try {
      await transporter.sendMail({
        from: user,
        to,
        subject: 'Verify your email address',
        html: `<p>Click the link below to verify your email address:</p>
                 <a href="${link}">Verify Email</a>`,
      });
    } catch (error) {
      throwError('transporter-error', error instanceof Error ? error.message : 'Unknown error');
    }
  };
}
