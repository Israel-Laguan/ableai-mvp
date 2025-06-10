ALTER TABLE "users" ADD COLUMN "block_id" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "login_attempts" integer DEFAULT 0;