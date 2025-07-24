ALTER TABLE "statistics"
    ALTER COLUMN "response_rate" SET DEFAULT 0,
    ALTER COLUMN "would_work" SET DEFAULT 0;

ALTER TABLE "gig_work_teams" ADD COLUMN "expenses" numeric DEFAULT 0;