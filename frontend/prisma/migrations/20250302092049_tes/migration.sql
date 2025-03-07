/*
  Warnings:

  - The `status` column on the `Actions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Permissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Routes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Actions" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Routes" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- DropEnum
DROP TYPE "Status";
