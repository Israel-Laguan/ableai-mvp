import { Auth } from '@product-domain/backend';

export const makeVerifyEmailHTML: Auth.Domain.Services.MakeVerifyEmailHTML = ({ link }) => {
  return `<p>Click the link below to verify your email address:</p>
                 <a href="${link}">Verify Email</a>`;
};
