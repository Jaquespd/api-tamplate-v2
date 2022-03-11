/*
  Warnings:

  - You are about to drop the column `user_service_id` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `store_id` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_user_service_id_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "user_service_id",
ADD COLUMN     "store_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
