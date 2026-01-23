/*
  Warnings:

  - A unique constraint covering the columns `[sid]` on the table `session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "session_sid_key" ON "session"("sid");
