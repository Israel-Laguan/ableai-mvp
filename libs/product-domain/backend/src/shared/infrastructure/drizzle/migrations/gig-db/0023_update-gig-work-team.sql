ALTER TABLE "gig_work_teams"
    ALTER COLUMN "is_accepted_offer" SET DEFAULT false,
    ALTER COLUMN "total_payment" SET NOT NULL,
    ALTER COLUMN "worker_id" SET NOT NULL;

ALTER TABLE "gig_work_teams" 
    ADD COLUMN "status" varchar DEFAULT 'PENDING';