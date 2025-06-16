ALTER TABLE "users" ALTER COLUMN "last_app_role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_app_role" DROP NOT NULL;