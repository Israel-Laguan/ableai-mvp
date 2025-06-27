CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"review" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
