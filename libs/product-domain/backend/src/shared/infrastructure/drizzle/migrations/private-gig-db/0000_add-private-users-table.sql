CREATE TABLE "private_data_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "private_data_user_email_unique" UNIQUE("email"),
	CONSTRAINT "private_data_user_full_name_unique" UNIQUE("full_name")
);
