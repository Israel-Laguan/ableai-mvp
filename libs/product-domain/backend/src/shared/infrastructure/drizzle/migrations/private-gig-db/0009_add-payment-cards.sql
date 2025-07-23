CREATE TABLE "payment_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"card_number" integer NOT NULL,
	"private_data_user_id" integer NOT NULL,
	"provider" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
