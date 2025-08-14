ALTER TABLE "gig_works" ADD COLUMN "skills" text;

UPDATE "gig_works" SET
    "latitude" = COALESCE("latitude", 0),
    "longitude" = COALESCE("longitude", 0),
    "address" = COALESCE("address", 'unknown'),
    "description" = COALESCE("description", 'unknown'),
    "payment_per_hour" = COALESCE("payment_per_hour", 0),
    "start_date" = COALESCE("start_date", NOW()),
    "end_date" = COALESCE("end_date", NOW() + INTERVAL '1 hour'),
    "skills" = COALESCE("skills", 'unknown');

ALTER TABLE "gig_works" ALTER COLUMN "address" SET NOT NULL;
ALTER TABLE "gig_works" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "gig_works" ALTER COLUMN "end_date" SET NOT NULL;
ALTER TABLE "gig_works" ALTER COLUMN "latitude" SET NOT NULL;
ALTER TABLE "gig_works" ALTER COLUMN "longitude" SET NOT NULL;
ALTER TABLE "gig_works" ALTER COLUMN "payment_per_hour" SET NOT NULL;
ALTER TABLE "gig_works" ALTER COLUMN "start_date" SET NOT NULL;
ALTER TABLE "gig_works" ALTER COLUMN "skills" SET NOT NULL;