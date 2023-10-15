/*
  Warnings:

  - You are about to drop the column `banarText` on the `attractions` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `attractions` table. All the data in the column will be lost.
  - Added the required column `banarTittle` to the `attractions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `attractions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripTime` to the `attractions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attractions" DROP COLUMN "banarText",
DROP COLUMN "time",
ADD COLUMN     "banarTittle" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "tripTime" TEXT NOT NULL;
