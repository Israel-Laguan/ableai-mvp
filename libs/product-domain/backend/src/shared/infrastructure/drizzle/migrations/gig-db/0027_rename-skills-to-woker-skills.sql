ALTER TABLE "skills" RENAME TO "worker_skills";
ALTER TABLE "gig_work_teams" RENAME COLUMN "skill_id" TO "worker_skill_id";