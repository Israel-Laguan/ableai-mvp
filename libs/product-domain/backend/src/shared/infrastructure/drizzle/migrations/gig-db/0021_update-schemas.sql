ALTER TABLE "statistics" ALTER COLUMN "response_rate" SET DEFAULT 15;--> statement-breakpoint
ALTER TABLE "statistics" ALTER COLUMN "would_work" SET DEFAULT 100;--> statement-breakpoint
ALTER TABLE "gig_work_teams" ADD COLUMN "expenses" numeric DEFAULT 0;