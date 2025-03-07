-- AlterTable
ALTER TABLE "Actions" ALTER COLUMN "group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Answers" ALTER COLUMN "group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Permissions" ALTER COLUMN "group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Roles" ALTER COLUMN "group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Routes" ALTER COLUMN "group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "group_id" SET DEFAULT 1;
