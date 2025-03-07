/*
  Warnings:

  - You are about to drop the column `group_id` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `org_id` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `org_id` on the `Questions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_org_id_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_org_id_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "group_id",
DROP COLUMN "org_id";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "group_id",
DROP COLUMN "org_id";
