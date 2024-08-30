/*
  Warnings:

  - You are about to drop the column `sessionToken` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[SessionToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `SessionToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "sessionToken",
ADD COLUMN     "SessionToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_SessionToken_key" ON "Session"("SessionToken");
