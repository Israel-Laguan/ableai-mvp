CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" varchar NOT NULL,
	"private_data_user_id" integer NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"role_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
