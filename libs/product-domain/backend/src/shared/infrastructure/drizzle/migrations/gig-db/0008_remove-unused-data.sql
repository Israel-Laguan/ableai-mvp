ALTER TABLE "users" ADD COLUMN "firebase_uid" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "avatar_url";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "display_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_view_buyer";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_view_worker";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_firebase_uid_unique" UNIQUE("firebase_uid");