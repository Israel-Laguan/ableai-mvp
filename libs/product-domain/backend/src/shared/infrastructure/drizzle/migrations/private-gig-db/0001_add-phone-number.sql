ALTER TABLE "private_data_user" DROP CONSTRAINT "private_data_user_full_name_unique";--> statement-breakpoint
ALTER TABLE "private_data_user" ALTER COLUMN "full_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "private_data_user" ADD COLUMN "phone_number" varchar;--> statement-breakpoint
ALTER TABLE "private_data_user" ADD CONSTRAINT "private_data_user_phone_number_unique" UNIQUE("phone_number");