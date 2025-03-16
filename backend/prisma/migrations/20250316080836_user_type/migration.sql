-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'STUDENT');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "user_type" "UserType" NOT NULL DEFAULT 'ADMIN';
