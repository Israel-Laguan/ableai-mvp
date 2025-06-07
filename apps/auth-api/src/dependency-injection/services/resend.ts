import { Resend } from 'resend';

import { env } from '../../config/env.config';
import { SendEmailInput } from '../../interfaces';

const resend = new Resend(env.EMAIL_API_KEY);

export const resendService = {
  sendEmail: async ({ subject, to, html }: SendEmailInput) => {
    return await resend.emails.send({ from: env.EMAIL, subject, to, html });
  },
};
