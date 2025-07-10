ALTER TABLE "gig_work_teams" DROP COLUMN "end_gig";
ALTER TABLE "gig_work_teams" ADD COLUMN "end_gig" boolean DEFAULT true;
