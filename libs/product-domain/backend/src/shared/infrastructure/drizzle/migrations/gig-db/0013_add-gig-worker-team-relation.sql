ALTER TABLE "gig_work_teams"
ADD CONSTRAINT "gig_work_teams_gig_work_id_fkey"
FOREIGN KEY ("gig_work_id") REFERENCES "gig_works"("id");