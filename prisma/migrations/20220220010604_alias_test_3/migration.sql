-- RenameForeignKey
ALTER TABLE "user_services" RENAME CONSTRAINT "services" TO "user_services_provider_id_fkey";

-- RenameForeignKey
ALTER TABLE "user_services" RENAME CONSTRAINT "users" TO "user_services_service_id_fkey";
