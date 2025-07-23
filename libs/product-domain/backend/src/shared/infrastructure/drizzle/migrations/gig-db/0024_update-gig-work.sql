ALTER TABLE "gig_works" 
    ALTER COLUMN "address" SET NOT NULL,
    ALTER COLUMN "description" SET NOT NULL,
    ALTER COLUMN "end_date" SET NOT NULL,
    ALTER COLUMN "latitude" SET NOT NULL,
    ALTER COLUMN "longitude" SET NOT NULL,
    ALTER COLUMN "payment_per_hour" SET NOT NULL;

ALTER TABLE "gig_works" 
    ALTER COLUMN "start_date" SET NOT NULL,
    ADD COLUMN "skills" text NOT NULL;