/*
  Warnings:

  - You are about to drop the column `address` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `desrciption` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Groups` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Groups_email_key";

-- DropIndex
DROP INDEX "Groups_mobile_key";

-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "address",
DROP COLUMN "desrciption",
DROP COLUMN "email",
DROP COLUMN "mobile";
