CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"entity_id" integer NOT NULL,
	"entity_type" text NOT NULL,
	"invoice_url" text,
	"pay_id" text,
	"provider" text NOT NULL,
	"status" text NOT NULL,
	"total" numeric NOT NULL,
	"transaction_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
