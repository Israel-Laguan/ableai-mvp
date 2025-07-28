DROP TABLE "statistics" CASCADE;

ALTER TABLE "gig_work_teams" ADD COLUMN "delegate_to_int" integer;

UPDATE "gig_work_teams"
SET "delegate_to_int" = 
    CASE 
        WHEN "delegate_to" ~ '^\d+$' THEN "delegate_to"::integer
        ELSE NULL
    END;

ALTER TABLE "gig_work_teams" DROP COLUMN "delegate_to";

ALTER TABLE "gig_work_teams" RENAME COLUMN "delegate_to_int" TO "delegate_to";

ALTER TABLE "buyers" 
    ADD COLUMN "response_rate" integer DEFAULT 0,
    ADD COLUMN "would_work" integer DEFAULT 0;

DELETE FROM "reviews";

ALTER TABLE "reviews" ADD COLUMN "app_role" varchar NOT NULL;

ALTER TABLE "skills"
    ADD COLUMN "response_rate" integer DEFAULT 0,
    ADD COLUMN "would_work" integer DEFAULT 0;