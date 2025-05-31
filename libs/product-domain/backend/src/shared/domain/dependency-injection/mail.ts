export type SendEmailService = ({
  html,
  subject,
  to,
}: {
  to: string;
  subject: string;
  html: string;
}) => Promise<void>;
