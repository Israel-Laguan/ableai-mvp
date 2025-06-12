ALTER TABLE "users" ALTER COLUMN "last_app_role" SET DEFAULT 'BUYER';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_app_role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "enabled" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "enabled" SET DEFAULT 'NOT_VERIFIED';