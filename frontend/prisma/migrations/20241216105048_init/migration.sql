/*
  Warnings:

  - You are about to drop the column `org_id` on the `Organizations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organizations" DROP CONSTRAINT "Organizations_org_id_fkey";

-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "org_id";
