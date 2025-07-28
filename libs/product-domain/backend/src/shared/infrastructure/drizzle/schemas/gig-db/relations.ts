import { relations } from 'drizzle-orm';

import {
  buyers,
  gigWorks,
  gigWorkTeams,
  recommendations,
  reviews,
  roles,
  skillHires,
  skills,
  slots,
  users,
  workers,
} from '.';

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  workers: many(workers),
  buyers: many(buyers),
  recommendations: many(recommendations),
  reviews: many(reviews),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const workersRelations = relations(workers, ({ one, many }) => ({
  user: one(users, {
    fields: [workers.userId],
    references: [users.id],
  }),
  recommendations: many(recommendations),
  skills: many(skills),
  slots: many(slots),
  gigWorkTeams: many(gigWorkTeams),
}));

export const buyersRelations = relations(buyers, ({ one, many }) => ({
  user: one(users, {
    fields: [buyers.userId],
    references: [users.id],
  }),
  gigWorks: many(gigWorks),
  skillHires: many(skillHires),
}));

export const gigWorksRelations = relations(gigWorks, ({ one, many }) => ({
  buyer: one(buyers, {
    fields: [gigWorks.buyerId],
    references: [buyers.id],
  }),
  gigWorkTeams: many(gigWorkTeams),
}));

export const gigWorkTeamsRelations = relations(gigWorkTeams, ({ one }) => ({
  gigWork: one(gigWorks, {
    fields: [gigWorkTeams.gigWorkId],
    references: [gigWorks.id],
  }),
  skill: one(skills, {
    fields: [gigWorkTeams.skillId],
    references: [skills.id],
  }),
  worker: one(workers, {
    fields: [gigWorkTeams.workerId],
    references: [workers.id],
  }),
}));

export const recommendationsRelations = relations(recommendations, ({ one }) => ({
  user: one(users, {
    fields: [recommendations.userId],
    references: [users.id],
  }),
  worker: one(workers, {
    fields: [recommendations.workerId],
    references: [workers.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const skillHiresRelations = relations(skillHires, ({ one }) => ({
  buyer: one(buyers, {
    fields: [skillHires.buyerId],
    references: [buyers.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  worker: one(workers, {
    fields: [skills.workerId],
    references: [workers.id],
  }),
}));

export const slotsRelations = relations(slots, ({ one }) => ({
  worker: one(workers, {
    fields: [slots.workerId],
    references: [workers.id],
  }),
}));
