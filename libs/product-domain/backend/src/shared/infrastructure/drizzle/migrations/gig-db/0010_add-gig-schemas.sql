CREATE TABLE "gig_work_team" (
	"id" serial PRIMARY KEY NOT NULL,
	"awarded_badge" varchar,
	"delegate_to" integer,
	"end_date_offer" timestamp,
	"end_gig" timestamp,
	"feedback" varchar,
	"gig_work_id" integer,
	"is_accepted_offer" boolean,
	"payment_id" integer,
	"skill_id" integer,
	"tips" numeric DEFAULT 0,
	"total_payment" numeric,
	"worker_id" integer,
	"work_time" integer DEFAULT 0,
	"would_work" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gig_work" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar,
	"buyer_id" integer NOT NULL,
	"description" varchar,
	"end_date" timestamp,
	"payment_per_hour" numeric,
	"start_date" timestamp,
	"title" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recommendations" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_external" boolean DEFAULT false,
	"name" varchar NOT NULL,
	"recommendation" varchar NOT NULL,
	"user_id" integer,
	"worker_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill_hires" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"buyer_id" integer NOT NULL,
	"gigs_completed" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"badges_awarded" varchar,
	"equipment" varchar,
	"experience_month" integer DEFAULT 0,
	"gigs_completed" integer DEFAULT 0,
	"images_url" varchar,
	"name" varchar NOT NULL,
	"rate_per_hour" numeric DEFAULT 0,
	"summary" varchar NOT NULL,
	"training_description" varchar,
	"video_url" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" serial PRIMARY KEY NOT NULL,
	"app_role" varchar DEFAULT 'BUYER',
	"response_rate" numeric DEFAULT 0,
	"user_id" integer,
	"would_work" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
