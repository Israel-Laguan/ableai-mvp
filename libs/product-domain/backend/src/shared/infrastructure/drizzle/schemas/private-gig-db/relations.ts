import { relations } from 'drizzle-orm';

import { paymentCards, privateDataUser } from '.';

export const paymentCardsRelations = relations(paymentCards, ({ one }) => ({
  privateDataUser: one(privateDataUser, {
    fields: [paymentCards.privateDataUserId],
    references: [privateDataUser.id],
  }),
}));
