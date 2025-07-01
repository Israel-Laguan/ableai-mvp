CREATE TABLE "slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"worker_id" integer NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "slots"
ADD CONSTRAINT "slot_worker_id_fkey"
FOREIGN KEY("worker_id") REFERENCES "workers"("id");

ALTER TABLE "workers" DROP COLUMN "slot_availability";