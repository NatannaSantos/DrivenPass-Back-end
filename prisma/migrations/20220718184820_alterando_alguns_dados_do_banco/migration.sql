/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `secureNotes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cards_title_key";

-- DropIndex
DROP INDEX "credentials_title_key";

-- DropIndex
DROP INDEX "secureNotes_title_key";

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "expirationDate" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_title_key" ON "cards"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_title_key" ON "credentials"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "secureNotes_userId_title_key" ON "secureNotes"("userId", "title");
