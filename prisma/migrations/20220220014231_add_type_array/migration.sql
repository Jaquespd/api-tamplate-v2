/*
  Warnings:

  - You are about to drop the column `role_hash` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_hash",
ADD COLUMN     "roles" VARCHAR(255)[];
