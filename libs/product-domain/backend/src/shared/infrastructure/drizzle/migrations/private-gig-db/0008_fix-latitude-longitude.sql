ALTER TABLE "private_data_user" ADD COLUMN "latitude_tmp" double precision;
ALTER TABLE "private_data_user" ADD COLUMN "longitude_tmp" double precision;

UPDATE "private_data_user"
SET
  "latitude_tmp" = CASE
    WHEN trim("latitude") ~ '^[-+]?\d+(\.\d+)?$' THEN trim("latitude")::double precision
    ELSE NULL
  END,
  "longitude_tmp" = CASE
    WHEN trim("longitude") ~ '^[-+]?\d+(\.\d+)?$' THEN trim("longitude")::double precision
    ELSE NULL
  END;

ALTER TABLE "private_data_user" DROP COLUMN "latitude";
ALTER TABLE "private_data_user" DROP COLUMN "longitude";

ALTER TABLE "private_data_user" RENAME COLUMN "latitude_tmp" TO "latitude";
ALTER TABLE "private_data_user" RENAME COLUMN "longitude_tmp" TO "longitude";