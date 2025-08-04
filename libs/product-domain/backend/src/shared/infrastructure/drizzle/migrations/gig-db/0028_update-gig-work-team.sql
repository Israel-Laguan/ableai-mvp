DELETE FROM "gig_work_teams" ;

ALTER TABLE "gig_work_teams" 
    ALTER COLUMN "gig_work_id" SET NOT NULL,
    ADD COLUMN "created_by" integer NOT NULL,
    ADD CONSTRAINT "gig_work_teams_created_by_fkey" 
        FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;