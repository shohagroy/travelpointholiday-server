/*
  Warnings:

  - You are about to drop the column `attractionid` on the `attraction_booking` table. All the data in the column will be lost.
  - Added the required column `attractionId` to the `attraction_booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attraction_booking" DROP CONSTRAINT "attraction_booking_attractionid_fkey";

-- AlterTable
ALTER TABLE "attraction_booking" DROP COLUMN "attractionid",
ADD COLUMN     "attractionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "attraction_booking" ADD CONSTRAINT "attraction_booking_attractionId_fkey" FOREIGN KEY ("attractionId") REFERENCES "attractions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
