ALTER TABLE "skills" RENAME TO "worker_skills";

ALTER TABLE "gig_work_teams" RENAME COLUMN "skill_id" TO "worker_skill_id";
ALTER TABLE "gig_work_teams" ALTER COLUMN "total_payment" SET DEFAULT 0;
ALTER TABLE "gig_work_teams" ALTER COLUMN "total_payment" DROP NOT NULL;
ALTER TABLE "gig_work_teams" ALTER COLUMN "end_date_offer" SET NOT NULL;