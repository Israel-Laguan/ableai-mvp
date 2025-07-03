CREATE TABLE "buyers" (
	"id" serial PRIMARY KEY NOT NULL,
	"badges_awarded" varchar,
	"business_address" varchar,
	"business_name" varchar,
	"business_registration_number" varchar,
	"business_role" varchar,
	"representative_id" varchar,
	"social_network_url" varchar,
	"user_id" integer NOT NULL,
	"video_url" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "buyers_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "workers" (
	"id" serial PRIMARY KEY NOT NULL,
	"feedback_summary" varchar,
	"slot_availability" varchar,
	"social_network_url" varchar,
	"tags" varchar,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "workers_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_buyer_allowed" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_kyc_approved" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_public_profile" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_rtw_approved" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_worker_allowed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "social_media_url" varchar;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_app_role";