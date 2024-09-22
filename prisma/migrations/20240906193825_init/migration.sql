/*
  Warnings:

  - You are about to drop the column `ivEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ivName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ivEmail",
DROP COLUMN "ivName";
