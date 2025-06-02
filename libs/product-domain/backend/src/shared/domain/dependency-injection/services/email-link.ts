export type SendEmailLinkService = ({ to, link }: { to: string; link: string }) => Promise<void>;
