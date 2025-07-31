DELETE FROM "gig_work_teams" ;

ALTER TABLE "gig_work_teams" 
    ALTER COLUMN "gig_work_id" SET NOT NULL,
    ADD COLUMN "created_by" integer NOT NULL;