ALTER TABLE "users" ALTER COLUMN "is_buyer_allowed" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_kyc_approved" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_public_profile" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_rtw_approved" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_worker_allowed" SET NOT NULL;