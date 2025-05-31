import * as nodemailer from 'nodemailer';

import { Errors } from '@shared';
import { DependencyInjection } from '../../domain';

const { throwError } = Errors.makeErrorRunner({
  'transporter-error': (message: string) =>
    Errors.InternalServerError.create(message, 'NODEMALIER_ERROR'),
});

export function makeNodemailerSendEmailService({
  pass,
  user,
}: {
  user: string;
  pass: string;
}): DependencyInjection.SendEmailService {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });

  return async ({ to, subject, html }) => {
    try {
      await transporter.sendMail({
        from: user,
        to,
        subject,
        html,
      });
    } catch (error) {
      throwError('transporter-error', error instanceof Error ? error.message : 'Unknown error');
    }
  };
}
