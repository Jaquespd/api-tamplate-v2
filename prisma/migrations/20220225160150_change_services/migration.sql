/*
  Warnings:

  - You are about to drop the column `area_availability_hash` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `categories_hash` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `cover_photo` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `hashtags_hash` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `location_hash` on the `services` table. All the data in the column will be lost.
  - Added the required column `coverPhoto` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "area_availability_hash",
DROP COLUMN "categories_hash",
DROP COLUMN "cover_photo",
DROP COLUMN "hashtags_hash",
DROP COLUMN "location_hash",
ADD COLUMN     "area_availability" VARCHAR(255)[],
ADD COLUMN     "categories" VARCHAR(255)[],
ADD COLUMN     "coverPhoto" VARCHAR(255) NOT NULL,
ADD COLUMN     "hashtags" VARCHAR(255)[],
ADD COLUMN     "location" VARCHAR(255)[],
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1020);
