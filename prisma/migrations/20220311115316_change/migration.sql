/*
  Warnings:

  - A unique constraint covering the columns `[schedule_id]` on the table `evaluations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "evaluations_schedule_id_key" ON "evaluations"("schedule_id");
