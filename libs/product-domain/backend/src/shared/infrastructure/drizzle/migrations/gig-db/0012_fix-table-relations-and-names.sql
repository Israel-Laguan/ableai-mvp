ALTER TABLE "gig_work_team" RENAME TO "gig_work_teams";--> statement-breakpoint
ALTER TABLE "gig_work" RENAME TO "gig_works";--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "worker_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "statistics" ADD COLUMN "app_role" varchar DEFAULT 'BUYER';--> statement-breakpoint
ALTER TABLE "statistics" ADD COLUMN "response_rate" numeric DEFAULT 0;--> statement-breakpoint
ALTER TABLE "statistics" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "statistics" ADD COLUMN "would_work" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "statistics" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "statistics" DROP COLUMN "buyer_id";--> statement-breakpoint
ALTER TABLE "statistics" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "statistics" DROP COLUMN "end_date";--> statement-breakpoint
ALTER TABLE "statistics" DROP COLUMN "payment_per_hour";--> statement-breakpoint
ALTER TABLE "statistics" DROP COLUMN "start_date";--> statement-breakpoint
ALTER TABLE "statistics" DROP COLUMN "title";--> statement-breakpoint

ALTER TABLE "buyers"
ADD CONSTRAINT "buyers_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "gig_work_teams"
ADD CONSTRAINT "gig_work_teams_worker_id_fkey"
FOREIGN KEY ("worker_id") REFERENCES "workers"("id");

ALTER TABLE "gig_works"
ADD CONSTRAINT "gig_works_buyer_id_fkey"
FOREIGN KEY ("buyer_id") REFERENCES "buyers"("id");

ALTER TABLE "recommendations"
ADD CONSTRAINT "recommendations_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id"),
ADD CONSTRAINT "recommendations_worker_id_fkey"
FOREIGN KEY ("worker_id") REFERENCES "workers"("id");

ALTER TABLE "reviews"
ADD CONSTRAINT "review_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "skills"
ADD CONSTRAINT "skills_worker_id_fkey"
FOREIGN KEY ("worker_id") REFERENCES "workers"("id");

ALTER TABLE "skill_hires"
ADD CONSTRAINT "skill_hires_buyer_id_fkey"
FOREIGN KEY ("buyer_id") REFERENCES "buyers"("id");

ALTER TABLE "statistics"
ADD CONSTRAINT "statistics_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "users"
ADD CONSTRAINT "users_role_id_fkey"
FOREIGN KEY ("role_id") REFERENCES "roles"("id");

ALTER TABLE "workers" 
ADD CONSTRAINT "worker_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id");
