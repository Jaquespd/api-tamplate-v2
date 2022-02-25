/*
  Warnings:

  - Changed the type of `price` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `duration` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
