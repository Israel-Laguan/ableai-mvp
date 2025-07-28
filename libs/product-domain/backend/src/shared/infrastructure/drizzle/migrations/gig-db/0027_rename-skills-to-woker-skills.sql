ALTER TABLE "skills" RENAME TO "worker_skills";

ALTER TABLE "gig_work_teams"
    RENAME COLUMN "skill_id" TO "worker_skill_id",
    ALTER COLUMN "total_payment" SET DEFAULT 0,
    ALTER COLUMN "total_payment" DROP NOT NULL;