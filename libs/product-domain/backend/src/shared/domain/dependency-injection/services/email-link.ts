export type SendEmailLinkService = ({ to, link }: { to: string; link: string }) => Promise<void>;

export type CreateEmailTokenService = ({ email }: { email: string }) => string;
