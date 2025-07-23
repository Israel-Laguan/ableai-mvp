UPDATE "gig_works" SET "latitude" = 0 WHERE "latitude" IS NULL;
UPDATE "gig_works" SET "longitude" = 0 WHERE "longitude" IS NULL;
UPDATE "gig_works" SET "address" = 'unknown' WHERE "address" IS NULL;
UPDATE "gig_works" SET "description" = 'unknown' WHERE "description" IS NULL;
UPDATE "gig_works" SET "payment_per_hour" = 0 WHERE "payment_per_hour" IS NULL;
UPDATE "gig_works" SET "start_date" = NOW() WHERE "start_date" IS NULL;
UPDATE "gig_works" SET "end_date" = NOW() + INTERVAL '1 hour' WHERE "end_date" IS NULL;

ALTER TABLE "gig_works" ADD COLUMN "skills" text;
UPDATE "gig_works" SET "skills" = 'unknown' WHERE "skills" IS NULL;

ALTER TABLE "gig_works" 
    ALTER COLUMN "address" SET NOT NULL,
    ALTER COLUMN "description" SET NOT NULL,
    ALTER COLUMN "end_date" SET NOT NULL,
    ALTER COLUMN "latitude" SET NOT NULL,
    ALTER COLUMN "longitude" SET NOT NULL,
    ALTER COLUMN "payment_per_hour" SET NOT NULL,
    ALTER COLUMN "start_date" SET NOT NULL,
    ALTER COLUMN "skills" SET NOT NULL;