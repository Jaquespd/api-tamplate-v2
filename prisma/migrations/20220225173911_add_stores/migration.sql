/*
  Warnings:

  - You are about to drop the `user_services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_user_service_id_fkey";

-- DropForeignKey
ALTER TABLE "user_services" DROP CONSTRAINT "user_services_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "user_services" DROP CONSTRAINT "user_services_service_id_fkey";

-- DropTable
DROP TABLE "user_services";

-- CreateTable
CREATE TABLE "stores" (
    "id" SERIAL NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_service_id_fkey" FOREIGN KEY ("user_service_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
